import React, { useEffect, useState } from 'react';
import {
  Trophy,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Search,
  Zap,
  Cpu,
  Sparkles,
  X,
} from 'lucide-react';
import { DEFAULT_TIERS, NBA_TEAMS } from './nbaData';

const getStoredValue = (key, fallback) => {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [tiers, setTiers] = useState(() => getStoredValue('nba_tierlist_2026_v3', DEFAULT_TIERS));
  const [teams, setTeams] = useState(() => getStoredValue('nba_teams_data_2026_v3', NBA_TEAMS));
  const [confFilter, setConfFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamTab, setSelectedTeamTab] = useState('roster');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [draggedTeamId, setDraggedTeamId] = useState(null);

  useEffect(() => {
    localStorage.setItem('nba_tierlist_2026_v3', JSON.stringify(tiers));
  }, [tiers]);

  useEffect(() => {
    localStorage.setItem('nba_teams_data_2026_v3', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('GEMINI_API_KEY', apiKey);
    }
  }, [apiKey]);

  const showToast = (msg) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(''), 3000);
  };

  const callGeminiAPI = async (prompt, systemInstruction = '') => {
    const effectiveKey =
      apiKey ||
      (typeof process !== 'undefined' && process.env ? process.env.VITE_GEMINI_API_KEY : '') ||
      (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY : '');

    if (!effectiveKey) {
      throw new Error('No se ha configurado la API Key de Gemini. Por favor, añádela en los ajustes.');
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveKey}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };

    if (systemInstruction) {
      payload.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Error HTTP ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('No se obtuvo respuesta válida de Gemini.');
      }

      return text;
    } catch (error) {
      console.error('Error en Gemini API:', error);
      throw error;
    }
  };

  const handleAnalyzeRosterWithAI = async (team) => {
    if (!team) return;
    setAiLoading(true);
    setAiAnalysis(null);

    const prompt = `Analiza la plantilla estimada para la temporada NBA 2026-2027 del equipo ${team.name} (${team.conf}).
Entrenador: ${team.coach || 'No asignado'}
Titulares: ${team.roster?.starters?.join(', ') || 'No definidos'}
Resto del equipo: ${team.roster?.bench?.join(', ') || 'No definidos'}

Estructura la respuesta en Markdown:
1. 🏀 Resumen Táctico
2. 💪 Puntos Fuertes
3. ⚠️ Debilidades o Dudas
4. 📈 Proyección de Victorias / Playoffs
5. 💡 Sugerencia de Traspaso / Ajuste`;

    try {
      const result = await callGeminiAPI(prompt, 'Eres un analista experto de baloncesto NBA. Responde en español.');
      setAiAnalysis(result);
      showToast('¡Análisis de IA generado!');
    } catch (error) {
      showToast(`Error: ${error.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleUpdateRosterWithAI = async (team) => {
    if (!team) return;
    setAiLoading(true);

    const prompt = `Devuelve en formato JSON la plantilla 2026-2027 para ${team.name}:
{
  "coach": "Nombre Entrenador",
  "roster": {
    "starters": ["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4", "Jugador 5"],
    "bench": ["Jugador 6", "Jugador 7", "Jugador 8", "Jugador 9", "Jugador 10"]
  }
}`;

    try {
      const responseText = await callGeminiAPI(prompt, 'Responde ÚNICAMENTE con JSON válido sin bloques markdown.');
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error('No se pudo extraer JSON.');
      }

      const parsedData = JSON.parse(jsonMatch[0]);
      const updatedTeams = teams.map((item) =>
        item.id === team.id
          ? {
              ...item,
              coach: parsedData.coach || item.coach,
              roster: parsedData.roster || item.roster,
            }
          : item,
      );

      setTeams(updatedTeams);
      setSelectedTeam(updatedTeams.find((item) => item.id === team.id));
      showToast('¡Roster actualizado con IA!');
    } catch (error) {
      showToast(`Error al actualizar: ${error.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const assignTeamToTier = (teamId, targetTierId) => {
    setTiers((currentTiers) => {
      const nextTiers = currentTiers.map((tier) => ({
        ...tier,
        teams: tier.teams.filter((id) => id !== teamId),
      }));

      if (targetTierId !== 'unassigned') {
        const targetTier = nextTiers.find((tier) => tier.id === targetTierId);
        if (targetTier && !targetTier.teams.includes(teamId)) {
          targetTier.teams.push(teamId);
        }
      }

      return nextTiers;
    });
  };

  const handleDragStart = (event, teamId) => {
    event.dataTransfer.effectAllowed = 'move';
    setDraggedTeamId(teamId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDropOnTier = (tierId) => {
    if (!draggedTeamId) return;
    assignTeamToTier(draggedTeamId, tierId);
    setDraggedTeamId(null);
  };

  const handleQuickMove = (teamId, targetTierId) => {
    assignTeamToTier(teamId, targetTierId);
  };

  const handleAddTier = () => {
    setTiers((current) => [
      ...current,
      { id: `tier-${Date.now()}`, name: 'Nuevo Tier', color: '#ec4899', teams: [] },
    ]);
    showToast('Tier añadido.');
  };

  const handleDeleteTier = (tierId) => {
    setTiers((current) => current.filter((tier) => tier.id !== tierId));
    showToast('Tier eliminado.');
  };

  const handleMoveTier = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= tiers.length) return;

    const nextTiers = [...tiers];
    [nextTiers[index], nextTiers[targetIndex]] = [nextTiers[targetIndex], nextTiers[index]];
    setTiers(nextTiers);
  };

  const handleResetList = () => {
    if (!window.confirm('¿Restablecer la Tier List por defecto?')) return;

    setTiers(DEFAULT_TIERS);
    setTeams(NBA_TEAMS);
    localStorage.removeItem('nba_tierlist_2026_v3');
    localStorage.removeItem('nba_teams_data_2026_v3');
    showToast('Configuración restablecida.');
  };

  const handleExportImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 1200;
    const tierHeight = 110;
    const headerHeight = 90;

    canvas.width = width;
    canvas.height = headerHeight + tiers.length * tierHeight + 40;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, canvas.height);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, headerHeight);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('NBA TIER LIST 2026-2027', 30, 42);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('Generado interactiva con Roster Manager & Gemini AI', 30, 68);

    tiers.forEach((tier, index) => {
      const y = headerHeight + index * tierHeight + 10;
      ctx.fillStyle = tier.color;
      ctx.fillRect(20, y, 220, tierHeight - 10);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(tier.name, 30, y + 50);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(245, y, width - 265, tierHeight - 10);

      tier.teams.forEach((teamId, tIdx) => {
        const teamObj = teams.find((team) => team.id === teamId);
        if (!teamObj) return;

        const teamX = 260 + tIdx * 85;
        if (teamX + 75 < width) {
          ctx.fillStyle = '#334155';
          ctx.fillRect(teamX, y + 10, 75, 80);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 13px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(teamObj.code, teamX + 37, y + 78);
          ctx.textAlign = 'left';
        }
      });
    });

    const link = document.createElement('a');
    link.download = 'NBA_TierList_2026.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Imagen exportada.');
  };

  const handleExportJSON = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({ tiers, teams }, null, 2))}`;
    const link = document.createElement('a');
    link.href = dataStr;
    link.download = 'nba_tierlist_2026.json';
    link.click();
    showToast('JSON guardado.');
  };

  const handleImportJSON = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const parsed = JSON.parse(loadEvent.target?.result || '{}');
        if (parsed.tiers) setTiers(parsed.tiers);
        if (parsed.teams) setTeams(parsed.teams);
        showToast('Configuración cargada.');
      } catch {
        showToast('Error al cargar JSON.');
      }
    };
    reader.readAsText(file);
  };

  const matchesConferenceFilter = (team) => confFilter === 'ALL' || team.conf === confFilter;
  const filteredTiers = tiers.map((tier) => ({
    ...tier,
    teams: tier.teams.filter((teamId) => {
      const team = teams.find((item) => item.id === teamId);
      return team ? matchesConferenceFilter(team) : false;
    }),
  }));

  const assignedTeamIds = new Set(filteredTiers.flatMap((tier) => tier.teams));
  const unassignedTeams = teams.filter((team) => {
    const isUnassigned = !assignedTeamIds.has(team.id);
    const matchesConf = matchesConferenceFilter(team);
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.code.toLowerCase().includes(searchQuery.toLowerCase());

    return isUnassigned && matchesConf && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {toastMessage && (
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <div className="rounded-full border border-emerald-500/30 bg-slate-900/90 px-4 py-2 text-xs font-medium text-emerald-300 shadow-lg backdrop-blur-sm">
            {toastMessage}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/20 backdrop-blur-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-500/15 p-2.5 text-indigo-300">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white">NBA Tier List & Roster Manager 2026-2027</h1>
                <p className="text-xs text-slate-400">Conferencias Este y Oeste • Gemini AI Integrado</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowApiKeyModal(true)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>API Key</span>
                {apiKey && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={handleExportImage}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
              >
                <Download className="h-3.5 w-3.5" />
                Exportar PNG
              </button>

              <button
                type="button"
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
              >
                <Share2 className="h-3.5 w-3.5" />
                Guardar JSON
              </button>

              <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700">
                <Upload className="h-3.5 w-3.5" />
                Cargar JSON
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>

              <button
                type="button"
                onClick={handleResetList}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-6">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {[
                ['ALL', 'Todos', 'bg-indigo-600 text-white'],
                ['East', 'Este', 'bg-blue-600 text-white'],
                ['West', 'Oeste', 'bg-red-600 text-white'],
              ].map(([value, label, activeClass]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setConfFilter(value)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    confFilter === value
                      ? activeClass
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {label} ({value === 'ALL' ? teams.length : teams.filter((team) => team.conf === value).length})
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Buscar equipo..."
                className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-9 pr-4 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none sm:w-64"
              />
            </div>

            <button
              type="button"
              onClick={handleAddTier}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
            >
              <Plus className="h-3.5 w-3.5" />
              Añadir Tier
            </button>
          </div>

          <div className="space-y-4">
            {filteredTiers.map((tier, index) => (
              <div
                key={tier.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDropOnTier(tier.id)}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-950/10 sm:flex-row"
              >
                <div
                  className="flex w-full items-center justify-between gap-3 px-3 py-3 sm:w-72 sm:flex-col sm:items-stretch sm:justify-center"
                  style={{ backgroundColor: `${tier.color}18` }}
                >
                  <input
                    value={tier.name}
                    onChange={(event) => {
                      setTiers((current) =>
                        current.map((item) =>
                          item.id === tier.id ? { ...item, name: event.target.value } : item,
                        ),
                      );
                    }}
                    className="w-full rounded border border-transparent bg-transparent text-sm font-bold text-white outline-none hover:border-white/20 focus:border-white/40"
                  />

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        {tier.teams.length} Equipos
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={tier.color}
                        onChange={(event) => {
                          setTiers((current) =>
                            current.map((item) =>
                              item.id === tier.id ? { ...item, color: event.target.value } : item,
                            ),
                          );
                        }}
                        className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
                        title="Cambiar Color"
                      />
                      <button
                        type="button"
                        onClick={() => handleMoveTier(index, -1)}
                        disabled={index === 0}
                        className="rounded p-0.5 text-white/70 transition hover:text-white disabled:opacity-30"
                        title="Mover arriba"
                      >
                        <MoveUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveTier(index, 1)}
                        disabled={index === tiers.length - 1}
                        className="rounded p-0.5 text-white/70 transition hover:text-white disabled:opacity-30"
                        title="Mover abajo"
                      >
                        <MoveDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTier(tier.id)}
                        className="rounded p-0.5 text-white/70 transition hover:text-red-300"
                        title="Eliminar Tier"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-[120px] flex-1 flex-wrap gap-2.5 p-3">
                  {tier.teams.length > 0 ? (
                    tier.teams.map((teamId) => {
                      const team = teams.find((item) => item.id === teamId);
                      if (!team) return null;

                      return (
                        <div
                          key={team.id}
                          draggable
                          onDragStart={(event) => handleDragStart(event, team.id)}
                          onDoubleClick={() => {
                            setSelectedTeam(team);
                            setAiAnalysis(null);
                            setSelectedTeamTab('roster');
                          }}
                          className="group relative flex h-20 w-20 cursor-grab flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-800 p-2 text-center shadow-sm transition hover:scale-[1.03] hover:bg-slate-700 active:cursor-grabbing"
                        >
                          {team.logo ? (
                            <img src={team.logo} alt={team.code} className="h-9 w-9 object-contain" />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold text-white">
                              {team.code}
                            </div>
                          )}
                          <span className="mt-1 text-[10px] font-bold text-slate-200">{team.code}</span>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleQuickMove(team.id, 'unassigned');
                            }}
                            className="absolute -right-1 -top-1.5 rounded-full border border-slate-700 bg-slate-900 p-0.5 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:text-red-400"
                            title="Quitar del Tier"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex w-full items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-4 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      Sin equipos en este filtro
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDropOnTier('unassigned')}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-200">Equipos Sin Clasificar ({unassignedTeams.length})</h2>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Arrastra o doble clic</span>
              </div>

              <div className="flex min-h-[120px] flex-wrap gap-2.5">
                {unassignedTeams.map((team) => (
                  <div
                    key={team.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, team.id)}
                    onDoubleClick={() => {
                      setSelectedTeam(team);
                      setAiAnalysis(null);
                      setSelectedTeamTab('roster');
                    }}
                    className="group relative flex h-20 w-20 cursor-grab flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-800 p-2 text-center shadow-sm transition hover:scale-[1.03] hover:bg-slate-700 active:cursor-grabbing"
                  >
                    {team.logo ? (
                      <img src={team.logo} alt={team.code} className="h-9 w-9 object-contain" />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold text-white">
                        {team.code}
                      </div>
                    )}
                    <span className="mt-1 text-[10px] font-bold text-slate-200">{team.code}</span>
                  </div>
                ))}

                {unassignedTeams.length === 0 && (
                  <div className="flex w-full items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/50 p-6 text-xs text-slate-400">
                    ¡Todos los equipos han sido clasificados!
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {selectedTeam && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-4 py-3">
              <div>
                <h3 className="text-lg font-black text-white">{selectedTeam.name}</h3>
                <p className="text-xs text-slate-400">
                  {selectedTeam.city} • Conferencia {selectedTeam.conf === 'East' ? 'Este' : 'Oeste'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTeam(null)}
                className="rounded-lg p-1 text-slate-400 transition hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-slate-800 bg-slate-900 px-4">
              <div className="flex flex-wrap gap-2 py-3">
                {[
                  ['roster', 'Plantilla 2026-2027'],
                  ['edit', 'Editar Roster'],
                  ['ai', 'Análisis IA'],
                ].map(([tab, label]) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedTeamTab(tab)}
                    className={`border-b-2 px-4 py-2.5 text-xs font-bold transition ${
                      selectedTeamTab === tab
                        ? tab === 'ai'
                          ? 'border-cyan-500 text-cyan-400'
                          : 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab === 'ai' ? (
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        {label}
                      </span>
                    ) : (
                      label
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {selectedTeamTab === 'roster' && (
                <div className="space-y-4">
                  {selectedTeam.coach && (
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Head Coach</p>
                      <p className="mt-1 text-sm font-semibold text-white">{selectedTeam.coach}</p>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">Titulares (Quinteto Inicial)</p>
                      <ul className="space-y-2">
                        {(selectedTeam.roster?.starters || []).map((player, index) => (
                          <li key={`${player}-${index}`} className="flex items-center gap-2 text-xs text-slate-200">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] font-bold text-indigo-300">
                              #{index + 1}
                            </span>
                            {player}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-slate-500">Resto del Equipo</p>
                      <ul className="space-y-2">
                        {(selectedTeam.roster?.bench || []).map((player, index) => (
                          <li key={`${player}-${index}`} className="text-xs text-slate-200">
                            {player}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedTeamTab === 'edit' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Entrenador (Head Coach)</label>
                    <input
                      value={selectedTeam.coach || ''}
                      onChange={(event) => {
                        const updated = teams.map((team) =>
                          team.id === selectedTeam.id ? { ...team, coach: event.target.value } : team,
                        );
                        setTeams(updated);
                        setSelectedTeam({ ...selectedTeam, coach: event.target.value });
                      }}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Titulares (separados por comas)</label>
                    <textarea
                      value={(selectedTeam.roster?.starters || []).join(', ')}
                      onChange={(event) => {
                        const starters = event.target.value.split(',').map((value) => value.trim()).filter(Boolean);
                        const updatedRoster = { ...selectedTeam.roster, starters };
                        const updated = teams.map((team) =>
                          team.id === selectedTeam.id ? { ...team, roster: updatedRoster } : team,
                        );
                        setTeams(updated);
                        setSelectedTeam({ ...selectedTeam, roster: updatedRoster });
                      }}
                      className="min-h-[100px] w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-slate-500">Banquillo (separados por comas)</label>
                    <textarea
                      value={(selectedTeam.roster?.bench || []).join(', ')}
                      onChange={(event) => {
                        const bench = event.target.value.split(',').map((value) => value.trim()).filter(Boolean);
                        const updatedRoster = { ...selectedTeam.roster, bench };
                        const updated = teams.map((team) =>
                          team.id === selectedTeam.id ? { ...team, roster: updatedRoster } : team,
                        );
                        setTeams(updated);
                        setSelectedTeam({ ...selectedTeam, roster: updatedRoster });
                      }}
                      className="min-h-[100px] w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {selectedTeamTab === 'ai' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Gemini AI Assistant</h4>
                      <p className="text-[11px] text-slate-400">Análisis táctico para la temporada 2026-2027</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateRosterWithAI(selectedTeam)}
                        disabled={aiLoading}
                        className="flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-slate-600 disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${aiLoading ? 'animate-spin' : ''}`} />
                        Actualizar Roster
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAnalyzeRosterWithAI(selectedTeam)}
                        disabled={aiLoading}
                        className="flex items-center gap-1 rounded-lg bg-cyan-600 px-3 py-1.5 text-xs text-white transition hover:bg-cyan-500 disabled:opacity-50"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Generar Análisis
                      </button>
                    </div>
                  </div>

                  {aiLoading && (
                    <div className="flex flex-col items-center justify-center space-y-2 py-8">
                      <RefreshCw className="h-6 w-6 animate-spin text-cyan-400" />
                      <p className="text-xs text-slate-400">Consultando a Gemini AI...</p>
                    </div>
                  )}

                  {aiAnalysis && (
                    <div className="whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs leading-relaxed text-slate-300">
                      {aiAnalysis}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-slate-800 bg-slate-950 px-4 py-3">
              <button
                type="button"
                onClick={() => setSelectedTeam(null)}
                className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-bold text-white">
                <Cpu className="h-5 w-5 text-cyan-400" />
                Configurar Gemini API Key
              </h3>

              <button type="button" onClick={() => setShowApiKeyModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-4 text-xs text-slate-400">
              Ingresa tu API Key de Google Gemini para habilitar el análisis e integración de plantillas con IA.
            </p>

            <input
              type="password"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowApiKeyModal(false)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
              >
                Guardar Clave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

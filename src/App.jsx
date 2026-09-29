import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Sparkles, Share2, Download, Upload, RefreshCw, Plus, Trash2, 
  Edit3, MoveUp, MoveDown, Search, Shield, Zap, Info, ChevronRight, 
  User, UserPlus, Settings, Check, X, AlertCircle, Cpu, Sliders, ExternalLink, Flame
} from 'lucide-react';


// High resolution team logos from ESPN CDN
const NBA_TEAMS = [
  // Eastern Conference
  { id: 'bos', name: 'Boston Celtics', city: 'Boston', conf: 'East', code: 'BOS', color: '#007A33', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png', coach: 'Joe Mazzulla',
    roster: {
      PG: ['Jrue Holiday', 'Pritchard'], SG: ['Derrick White', 'Baylor Scheierman'], SF: ['Jaylen Brown', 'Sam Hauser'], PF: ['Jayson Tatum', 'Oshae Brissett'], C: ['Kristaps Porzingis', 'Al Horford']
    }
  },
  { id: 'nyk', name: 'New York Knicks', city: 'New York', conf: 'East', code: 'NYK', color: '#F58426', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/ny.png', coach: 'Tom Thibodeau',
    roster: {
      PG: ['Jalen Brunson', 'Miles McBride'], SG: ['Mikal Bridges', 'Cameron Payne'], SF: ['OG Anunoby', 'Pacome Dadiet'], PF: ['Josh Hart', 'Precious Achiuwa'], C: ['Karl-Anthony Towns', 'Mitchell Robinson']
    }
  },
  { id: 'phi', name: 'Philadelphia 76ers', city: 'Philadelphia', conf: 'East', code: 'PHI', color: '#006BB6', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/phi.png', coach: 'Nick Nurse',
    roster: {
      PG: ['Tyrese Maxey', 'Kyle Lowry'], SG: ['Kelly Oubre Jr.', 'Jared McCain'], SF: ['Paul George', 'KJ Martin'], PF: ['Caleb Martin', 'Guerschon Yabusele'], C: ['Joel Embiid', 'Andre Drummond']
    }
  },
  { id: 'mil', name: 'Milwaukee Bucks', city: 'Milwaukee', conf: 'East', code: 'MIL', color: '#00471B', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/mil.png', coach: 'Doc Rivers',
    roster: {
      PG: ['Damian Lillard', 'Delon Wright'], SG: ['Gary Trent Jr.', 'AJ Green'], SF: ['Khris Middleton', 'Taurean Prince'], PF: ['Giannis Antetokounmpo', 'Tyler Smith'], C: ['Brook Lopez', 'Bobby Portis']
    }
  },
  { id: 'cle', name: 'Cleveland Cavaliers', city: 'Cleveland', conf: 'East', code: 'CLE', color: '#860038', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/cle.png', coach: 'Kenny Atkinson',
    roster: {
      PG: ['Darius Garland', 'Ty Jerome'], SG: ['Donovan Mitchell', 'Caris LeVert'], SF: ['Max Strus', 'Isaac Okoro'], PF: ['Evan Mobley', 'Georges Niang'], C: ['Jarrett Allen', 'Dean Wade']
    }
  },
  { id: 'orl', name: 'Orlando Magic', city: 'Orlando', conf: 'East', code: 'ORL', color: '#0077C0', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/orl.png', coach: 'Jamahl Mosley',
    roster: {
      PG: ['Jalen Suggs', 'Cole Anthony'], SG: ['Kentavious Caldwell-Pope', 'Anthony Black'], SF: ['Franz Wagner', 'Tristan da Silva'], PF: ['Paolo Banchero', 'Jonathan Isaac'], C: ['Wendell Carter Jr.', 'Goga Bitadze']
    }
  },
  { id: 'ind', name: 'Indiana Pacers', city: 'Indiana', conf: 'East', code: 'IND', color: '#002D62', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/ind.png', coach: 'Rick Carlisle',
    roster: {
      PG: ['Tyrese Haliburton', 'TJ McConnell'], SG: ['Andrew Nembhard', 'Ben Sheppard'], SF: ['Aaron Nesmith', 'Bennedict Mathurin'], PF: ['Pascal Siakam', 'Jarace Walker'], C: ['Myles Turner', 'Isaiah Jackson']
    }
  },
  { id: 'mia', name: 'Miami Heat', city: 'Miami', conf: 'East', code: 'MIA', color: '#98002E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png', coach: 'Erik Spoelstra',
    roster: {
      PG: ['Terry Rozier', 'Tyler Herro'], SG: ['Duncan Robinson', 'Alec Burks'], SF: ['Jimmy Butler', 'Jaime Jaquez Jr.'], PF: ['Nikola Jović', 'Haywood Highsmith'], C: ['Bam Adebayo', 'Kel\'el Ware']
    }
  },
  { id: 'atl', name: 'Atlanta Hawks', city: 'Atlanta', conf: 'East', code: 'ATL', color: '#C8102E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/atl.png', coach: 'Quin Snyder',
    roster: {
      PG: ['Trae Young', 'Kobe Bufkin'], SG: ['Dyson Daniels', 'Bogdan Bogdanović'], SF: ['Zaccharie Risacher', 'De\'Andre Hunter'], PF: ['Jalen Johnson', 'Larry Nance Jr.'], C: ['Clint Capela', 'Onyeka Okongwu']
    }
  },
  { id: 'chi', name: 'Chicago Bulls', city: 'Chicago', conf: 'East', code: 'CHI', color: '#CE1141', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png', coach: 'Billy Donovan',
    roster: {
      PG: ['Coby White', 'Lonzo Ball'], SG: ['Josh Giddey', 'Ayo Dosunmu'], SF: ['Zach LaVine', 'Matas Buzelis'], PF: ['Patrick Williams', 'Torrey Craig'], C: ['Nikola Vučević', 'Jalen Smith']
    }
  },
  { id: 'tor', name: 'Toronto Raptors', city: 'Toronto', conf: 'East', code: 'TOR', color: '#CE1141', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/tor.png', coach: 'Darko Rajaković',
    roster: {
      PG: ['Immanuel Quickley', 'Davion Mitchell'], SG: ['Gradey Dick', 'Ja\'Kobe Walter'], SF: ['RJ Barrett', 'Ochai Agbaji'], PF: ['Scottie Barnes', 'Chris Boucher'], C: ['Jakob Poeltl', 'Kelly Olynyk']
    }
  },
  { id: 'bkn', name: 'Brooklyn Nets', city: 'Brooklyn', conf: 'East', code: 'BKN', color: '#000000', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/bkn.png', coach: 'Jordi Fernández',
    roster: {
      PG: ['Dennis Schröder', 'Ben Simmons'], SG: ['Cam Thomas', 'Keon Johnson'], SF: ['Bojan Bogdanović', 'Ziaire Williams'], PF: ['Cameron Johnson', 'Trendon Watford'], C: ['Nic Claxton', 'Day\'Ron Sharpe']
    }
  },
  { id: 'det', name: 'Detroit Pistons', city: 'Detroit', conf: 'East', code: 'DET', color: '#1D428A', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/det.png', coach: 'J.B. Bickerstaff',
    roster: {
      PG: ['Cade Cunningham', 'Jaden Ivey'], SG: ['Malik Beasley', 'Marcus Sasser'], SF: ['Ausar Thompson', 'Tim Hardaway Jr.'], PF: ['Tobias Harris', 'Ron Holland'], C: ['Jalen Duren', 'Isaiah Stewart']
    }
  },
  { id: 'cha', name: 'Charlotte Hornets', city: 'Charlotte', conf: 'East', code: 'CHA', color: '#1D1160', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/cha.png', coach: 'Charles Lee',
    roster: {
      PG: ['LaMelo Ball', 'Tre Mann'], SG: ['Brandon Miller', 'Josh Green'], SF: ['Cody Martin', 'Tidjane Salaün'], PF: ['Miles Bridges', 'Grant Williams'], C: ['Nick Richards', 'Mark Williams']
    }
  },
  { id: 'was', name: 'Washington Wizards', city: 'Washington', conf: 'East', code: 'WAS', color: '#002B5C', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/was.png', coach: 'Brian Keefe',
    roster: {
      PG: ['Malcolm Brogdon', 'Bub Carrington'], SG: ['Jordan Poole', 'Corey Kispert'], SF: ['Bilal Coulibaly', 'Sadraque Nganga'], PF: ['Kyle Kuzma', 'Alex Sarr'], C: ['Jonas Valančiūnas', 'Richaun Holmes']
    }
  },

  // Western Conference
  { id: 'okc', name: 'Oklahoma City Thunder', city: 'Oklahoma City', conf: 'West', code: 'OKC', color: '#007AC1', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/okc.png', coach: 'Mark Daigneault',
    roster: {
      PG: ['Shai Gilgeous-Alexander', 'Alex Caruso'], SG: ['Lu Dort', 'Cason Wallace'], SF: ['Jalen Williams', 'Aaron Wiggins'], PF: ['Chet Holmgren', 'Ousmane Dieng'], C: ['Isaiah Hartenstein', 'Jaylin Williams']
    }
  },
  { id: 'den', name: 'Denver Nuggets', city: 'Denver', conf: 'West', code: 'DEN', color: '#0E2240', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/den.png', coach: 'Michael Malone',
    roster: {
      PG: ['Jamal Murray', 'Russell Westbrook'], SG: ['Christian Braun', 'Julian Strawther'], SF: ['Michael Porter Jr.', 'Peyton Watson'], PF: ['Aaron Gordon', 'Vlatko Čančar'], C: ['Nikola Jokić', 'Dario Šarić']
    }
  },
  { id: 'min', name: 'Minnesota Timberwolves', city: 'Minnesota', conf: 'West', code: 'MIN', color: '#0C2340', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/min.png', coach: 'Chris Finch',
    roster: {
      PG: ['Mike Conley', 'Rob Dillingham'], SG: ['Anthony Edwards', 'Donte DiVincenzo'], SF: ['Jaden McDaniels', 'Terrence Shannon Jr.'], PF: ['Julius Randle', 'Naz Reid'], C: ['Rudy Gobert', 'Luka Garza']
    }
  },
  { id: 'dal', name: 'Dallas Mavericks', city: 'Dallas', conf: 'West', code: 'DAL', color: '#00538C', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/dal.png', coach: 'Jason Kidd',
    roster: {
      PG: ['Luka Dončić', 'Spencer Dinwiddie'], SG: ['Kyrie Irving', 'Jaden Hardy'], SF: ['Klay Thompson', 'Naji Marshall'], PF: ['P.J. Washington', 'Maxi Kleber'], C: ['Dereck Lively II', 'Daniel Gafford']
    }
  },
  { id: 'phx', name: 'Phoenix Suns', city: 'Phoenix', conf: 'West', code: 'PHX', color: '#1D1160', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/phx.png', coach: 'Mike Budenholzer',
    roster: {
      PG: ['Tyus Jones', 'Monte Morris'], SG: ['Devin Booker', 'Grayson Allen'], SF: ['Bradley Beal', 'Royce O\'Neale'], PF: ['Kevin Durant', 'Ryan Dunn'], C: ['Jusuf Nurkić', 'Mason Plumlee']
    }
  },
  { id: 'lal', name: 'Los Angeles Lakers', city: 'Los Angeles', conf: 'West', code: 'LAL', color: '#552583', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png', coach: 'JJ Redick',
    roster: {
      PG: ['D\'Angelo Russell', 'Gabe Vincent'], SG: ['Austin Reaves', 'Dalton Knecht'], SF: ['LeBron James', 'Max Christie'], PF: ['Rui Hachimura', 'Jarred Vanderbilt'], C: ['Anthony Davis', 'Jaxson Hayes']
    }
  },
  { id: 'gs', name: 'Golden State Warriors', city: 'Golden State', conf: 'West', code: 'GS', color: '#1D428A', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', coach: 'Steve Kerr',
    roster: {
      PG: ['Stephen Curry', 'De\'Anthony Melton'], SG: ['Brandin Podziemski', 'Buddy Hield'], SF: ['Jonathan Kuminga', 'Moses Moody'], PF: ['Draymond Green', 'Kyle Anderson'], C: ['Kevon Looney', 'Trayce Jackson-Davis']
    }
  },
  { id: 'sac', name: 'Sacramento Kings', city: 'Sacramento', conf: 'West', code: 'SAC', color: '#5A2D81', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/sac.png', coach: 'Mike Brown',
    roster: {
      PG: ['De\'Aaron Fox', 'Devin Carter'], SG: ['Keon Ellis', 'Malik Monk'], SF: ['DeMar DeRozan', 'Kevin Huerter'], PF: ['Keegan Murray', 'Trey Lyles'], C: ['Domantas Sabonis', 'Alex Len']
    }
  },
  { id: 'hou', name: 'Houston Rockets', city: 'Houston', conf: 'West', code: 'HOU', color: '#CE1141', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/hou.png', coach: 'Ime Udoka',
    roster: {
      PG: ['Fred VanVleet', 'Reed Sheppard'], SG: ['Jalen Green', 'Amen Thompson'], SF: ['Dillon Brooks', 'Cam Whitmore'], PF: ['Jabari Smith Jr.', 'Tari Eason'], C: ['Alperen Şengün', 'Steven Adams']
    }
  },
  { id: 'mem', name: 'Memphis Grizzlies', city: 'Memphis', conf: 'West', code: 'MEM', color: '#5D76A9', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/mem.png', coach: 'Taylor Jenkins',
    roster: {
      PG: ['Ja Morant', 'Scotty Pippen Jr.'], SG: ['Desmond Bane', 'Luke Kennard'], SF: ['Marcus Smart', 'Vince Williams Jr.'], PF: ['Jaren Jackson Jr.', 'GG Jackson'], C: ['Zach Edey', 'Brandon Clarke']
    }
  },
  { id: 'lac', name: 'LA Clippers', city: 'Los Angeles', conf: 'West', code: 'LAC', color: '#C8102E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lac.png', coach: 'Tyronn Lue',
    roster: {
      PG: ['James Harden', 'Kris Dunn'], SG: ['Norman Powell', 'Terance Mann'], SF: ['Kawhi Leonard', 'Amir Coffey'], PF: ['Derrick Jones Jr.', 'Nicolas Batum'], C: ['Ivica Zubac', 'Mo Bamba']
    }
  },
  { id: 'nop', name: 'New Orleans Pelicans', city: 'New Orleans', conf: 'West', code: 'NOP', color: '#0C2340', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/no.png', coach: 'Willie Green',
    roster: {
      PG: ['Dejounte Murray', 'Jose Alvarado'], SG: ['CJ McCollum', 'Jordan Hawkins'], SF: ['Brandon Ingram', 'Trey Murphy III'], PF: ['Zion Williamson', 'Herbert Jones'], C: ['Daniel Theis', 'Yves Missi']
    }
  },

  { id: 'sas', name: 'San Antonio Spurs', city: 'San Antonio', conf: 'West', code: 'SAS', color: '#C4CED4', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/sa.png', coach: 'Gregg Popovich / Mitch Johnson',
    roster: {
      PG: ['Chris Paul', 'Tre Jones'], SG: ['Stephon Castle', 'Malaki Branham'], SF: ['Devin Vassell', 'Julian Champagnie'], PF: ['Jeremy Sochan', 'Harrison Barnes'], C: ['Victor Wembanyama', 'Zach Collins']
    }
  },
  { id: 'uta', name: 'Utah Jazz', city: 'Utah', conf: 'West', code: 'UTA', color: '#002B5C', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/uta.png', coach: 'Will Hardy',
    roster: {
      PG: ['Keyonte George', 'Isaiah Collier'], SG: ['Collin Sexton', 'Jordan Clarkson'], SF: ['Lauri Markkanen', 'Cody Williams'], PF: ['John Collins', 'Taylor Hendricks'], C: ['Walker Kessler', 'Drew Eubanks']
    }
  },
  { id: 'por', name: 'Portland Trail Blazers', city: 'Portland', conf: 'West', code: 'POR', color: '#E03A3E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/por.png', coach: 'Chauncey Billups',
    roster: {
      PG: ['Scoot Henderson', 'Anfernee Simons'], SG: ['Shaedon Sharpe', 'Matisse Thybulle'], SF: ['Deni Avdija', 'Toumani Camara'], PF: ['Jerami Grant', 'Kris Murray'], C: ['Deandre Ayton', 'Donovan Clingan']
    }
  }
];

const DEFAULT_TIERS = [
  { id: 'tier-s', name: 'S - Contendientes al Título 🏆', color: '#f59e0b', teams: ['bos', 'okc', 'nyk', 'den'] },
  { id: 'tier-a', name: 'A - Playoffs Directos 🏀', color: '#10b981', teams: ['min', 'dal', 'phi', 'mil', 'cle', 'phx'] },
  { id: 'tier-b', name: 'B - Play-In Tournament ⚡', color: '#3b82f6', teams: ['lal', 'gs', 'mia', 'ind', 'orl', 'sac', 'hou', 'mem'] },
  { id: 'tier-c', name: 'C - En Lucha / Reconstrucción 🎯', color: '#8b5cf6', teams: ['sas', 'atl', 'nop', 'lac', 'chi', 'tor'] },
  { id: 'tier-d', name: 'D - Tanking / Desarrollo 🛠️', color: '#64748b', teams: ['bkn', 'det', 'cha', 'was', 'uta', 'por'] }
];


export default function App() {
  // State variables
  const [tiers, setTiers] = useState(() => {
    const saved = localStorage.getItem('nba_tierlist_2026');
    return saved ? JSON.parse(saved) : DEFAULT_TIERS;
  });

  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('nba_teams_data_2026');
    return saved ? JSON.parse(saved) : NBA_TEAMS;
  });

  const [confFilter, setConfFilter] = useState('ALL'); // 'ALL', 'East', 'West'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null); // For Roster Modal
  const [selectedTeamTab, setSelectedTeamTab] = useState('roster'); // 'roster', 'edit', 'ai', 'json'
  
  // AI State
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Drag and drop state
  const [draggedTeamId, setDraggedTeamId] = useState(null);

  // Auto-save to LocalStorage
  useEffect(() => {
    localStorage.setItem('nba_tierlist_2026', JSON.stringify(tiers));
  }, [tiers]);

  useEffect(() => {
    localStorage.setItem('nba_teams_data_2026', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('GEMINI_API_KEY', apiKey);
    }
  }, [apiKey]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };


  // Gemini API helper
  const callGeminiAPI = async (prompt, systemInstruction = '') => {
    const effectiveKey = apiKey || (typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : '');
    
    // Always use gemini-3-flash-preview
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${effectiveKey}`;
    
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      tools: [{ "google_search": {} }]
    };

    if (systemInstruction) {
      payload.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP Error ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No se obtuvo respuesta válida de Gemini.");
      return text;
    } catch (err) {
      console.error("Error en Gemini API:", err);
      throw err;
    }
  };

  // AI Roster Analysis handler
  const handleAnalyzeRosterWithAI = async (team) => {
    setAiLoading(true);
    setAiAnalysis(null);

    const prompt = `Analiza la plantilla estimada para la temporada NBA 2026-2027 del equipo ${team.name} (${team.conf}).
    
    Entrenador: ${team.coach}
    Roster por posiciones:
    - Base (PG): ${team.roster.PG.join(', ')}
    - Escolta (SG): ${team.roster.SG.join(', ')}
    - Alero (SF): ${team.roster.SF.join(', ')}
    - Ala-Pívot (PF): ${team.roster.PF.join(', ')}
    - Pívot (C): ${team.roster.C.join(', ')}

    Por favor provee un informe estructurado en formato Markdown con:
    1. 🏀 **Resumen Táctico 2026-2027**
    2. 💪 **Puntos Fuertes Clave**
    3. ⚠️ **Principales Debilidades o Dudas**
    4. 📈 **Proyección de Victorias y Aspiraciones en Playoffs**
    5. 💡 **Sugerencia de Traspaso / Fichaje para Potenciar la Plantilla**`;

    const systemPrompt = "Eres un analista experto de baloncesto NBA especializado en proyecciones tácticas y análisis de plantillas para la temporada 2026-2027. Responde en español neutro, conciso y profesional.";

    try {
      const result = await callGeminiAPI(prompt, systemPrompt);
      setAiAnalysis(result);
      showToast("¡Análisis de IA generado con éxito!");
    } catch (err) {
      showToast(`Error al consultar Gemini: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  // AI Automatic Roster Update handler
  const handleUpdateRosterWithAI = async (team) => {
    setAiLoading(true);
    const prompt = `Busca y genera la información más reciente de la plantilla para la temporada NBA 2026-2027 de los ${team.name}.
    Devuelve ÚNICAMENTE un objeto JSON estrictamente formateado con esta estructura (sin texto explicativo antes ni después):
    {
      "coach": "Nombre del Entrenador",
      "roster": {
        "PG": ["Jugador 1", "Jugador 2"],
        "SG": ["Jugador 1", "Jugador 2"],
        "SF": ["Jugador 1", "Jugador 2"],
        "PF": ["Jugador 1", "Jugador 2"],
        "C": ["Jugador 1", "Jugador 2"]
      }
    }`;

    try {
      const responseText = await callGeminiAPI(prompt, "Eres una API que responde ÚNICAMENTE con código JSON válido sobre rosters NBA 2026-2027.");
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No se pudo extraer JSON de la respuesta.");
      
      const parsedData = JSON.parse(jsonMatch[0]);
      
      // Update local team state
      const updatedTeams = teams.map(t => {
        if (t.id === team.id) {
          return {
            ...t,
            coach: parsedData.coach || t.coach,
            roster: parsedData.roster || t.roster
          };
        }
        return t;
      });

      setTeams(updatedTeams);
      setSelectedTeam(updatedTeams.find(t => t.id === team.id));
      showToast("¡Roster actualizado con datos IA de la temporada 2026-2027!");
    } catch (err) {
      showToast(`Error al actualizar roster: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };


  // Team Drag and Drop Logic
  const handleDragStart = (e, teamId) => {
    setDraggedTeamId(teamId);
    e.dataTransfer.setData('text/plain', teamId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnTier = (tierId) => {
    if (!draggedTeamId) return;

    // Remove team from all tiers first
    const updatedTiers = tiers.map(tier => ({
      ...tier,
      teams: tier.teams.filter(id => id !== draggedTeamId)
    }));

    // Add to target tier
    if (tierId !== 'unassigned') {
      const targetTier = updatedTiers.find(t => t.id === tierId);
      if (targetTier && !targetTier.teams.includes(draggedTeamId)) {
        targetTier.teams.push(draggedTeamId);
      }
    }

    setTiers(updatedTiers);
    setDraggedTeamId(null);
  };

  // Quick move team via click
  const handleQuickMove = (teamId, targetTierId) => {
    const updatedTiers = tiers.map(tier => ({
      ...tier,
      teams: tier.teams.filter(id => id !== teamId)
    }));

    if (targetTierId !== 'unassigned') {
      const targetTier = updatedTiers.find(t => t.id === targetTierId);
      if (targetTier) {
        targetTier.teams.push(teamId);
      }
    }

    setTiers(updatedTiers);
  };

  // Tier Editing Actions
  const handleAddTier = () => {
    const newTier = {
      id: `tier-${Date.now()}`,
      name: 'Nuevo Tier',
      color: '#ec4899',
      teams: []
    };
    setTiers([...tiers, newTier]);
    showToast("Tier añadido.");
  };

  const handleDeleteTier = (tierId) => {
    setTiers(tiers.filter(t => t.id !== tierId));
    showToast("Tier eliminado.");
  };

  const handleMoveTier = (index, direction) => {
    const newTiers = [...tiers];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newTiers.length) return;
    const temp = newTiers[index];
    newTiers[index] = newTiers[targetIndex];
    newTiers[targetIndex] = temp;
    setTiers(newTiers);
  };

  const handleUpdateTierName = (tierId, newName) => {
    setTiers(tiers.map(t => t.id === tierId ? { ...t, name: newName } : t));
  };

  const handleUpdateTierColor = (tierId, newColor) => {
    setTiers(tiers.map(t => t.id === tierId ? { ...t, color: newColor } : t));
  };

  const handleResetList = () => {
    if (window.confirm("¿Seguro que deseas restablecer la Tier List por defecto?")) {
      setTiers(DEFAULT_TIERS);
      setTeams(NBA_TEAMS);
      localStorage.removeItem('nba_tierlist_2026');
      localStorage.removeItem('nba_teams_data_2026');
      showToast("Configuración restablecida.");
    }
  };

  // Export Tier List as Image (via HTML5 Canvas)
  const handleExportImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const width = 1200;
    const tierHeight = 110;
    const headerHeight = 90;
    const totalHeight = headerHeight + (tiers.length * tierHeight) + 40;

    canvas.width = width;
    canvas.height = totalHeight;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, totalHeight);

    // Title Banner
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, headerHeight);
    
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('NBA TIER LIST 2026-2027', 30, 42);
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('Generado interactiva con Roster Manager & Gemini AI', 30, 68);

    // Draw Tiers
    tiers.forEach((tier, index) => {
      const y = headerHeight + (index * tierHeight) + 10;
      
      // Tier Name Box
      ctx.fillStyle = tier.color;
      ctx.fillRect(20, y, 220, tierHeight - 10);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      
      // Wrap text in box
      const words = tier.name.split(' ');
      let line = '';
      let lineY = y + 45;
      words.forEach(word => {
        if (ctx.measureText(line + word).width > 190) {
          ctx.fillText(line, 30, lineY);
          line = word + ' ';
          lineY += 22;
        } else {
          line += word + ' ';
        }
      });
      ctx.fillText(line, 30, lineY);

      // Tier Content Box
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(245, y, width - 265, tierHeight - 10);

      // Draw team badges inside tier
      tier.teams.forEach((teamId, tIdx) => {
        const teamObj = teams.find(t => t.id === teamId);
        if (!teamObj) return;

        const teamX = 260 + (tIdx * 85);
        const teamY = y + 10;

        if (teamX + 75 < width) {
          // Team card background
          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.roundRect(teamX, teamY, 75, 80, 8);
          ctx.fill();

          // Team Code
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 13px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(teamObj.code, teamX + 37, teamY + 68);
          ctx.textAlign = 'left';
        }
      });
    });

    // Download Link
    const link = document.createElement('a');
    link.download = `NBA_TierList_2026_2027.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast("Imagen de la Tier List descargada.");
  };

  // Export JSON configuration
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ tiers, teams }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nba_tierlist_2026_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Configuración exportada en JSON.");
  };

  // Import JSON configuration
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.tiers) setTiers(parsed.tiers);
        if (parsed.teams) setTeams(parsed.teams);
        showToast("Configuración cargada exitosamente.");
      } catch (err) {
        showToast("Error al importar archivo JSON.");
      }
    };
  };

  // Get unassigned teams
  const assignedTeamIds = new Set(tiers.flatMap(t => t.teams));
  const unassignedTeams = teams.filter(team => {
    const isUnassigned = !assignedTeamIds.has(team.id);
    const matchesConf = confFilter === 'ALL' || team.conf === confFilter;
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          team.code.toLowerCase().includes(searchQuery.toLowerCase());
    return isUnassigned && matchesConf && matchesSearch;
  });


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12 select-none">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce border border-indigo-400">
          <Zap className="w-5 h-5 text-yellow-300" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-slate-900/90">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-red-600 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  NBA Tier List & Roster Manager
                </h1>
                <span className="bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold px-2 py-0.5 rounded-full">
                  2026 - 2027
                </span>
              </div>
              <p className="text-xs text-slate-400">Conferencias Este y Oeste • Análisis IA Gemini Integrado</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition"
              title="Configurar Clave API de Gemini"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Gemini API</span>
              {apiKey && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
            </button>

            <button
              onClick={handleExportImage}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition shadow-md shadow-indigo-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Exportar PNG</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Guardar JSON</span>
            </button>

            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 cursor-pointer transition">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Cargar JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>

            <button
              onClick={handleResetList}
              className="p-2 bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-lg border border-slate-700 transition"
              title="Restablecer Tier List"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Filter Controls Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Conference Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setConfFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${confFilter === 'ALL' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Todos los Equipos (30)
            </button>
            <button
              onClick={() => setConfFilter('East')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition ${confFilter === 'East' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Conferencia Este (15)
            </button>
            <button
              onClick={() => setConfFilter('West')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition ${confFilter === 'West' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              Conferencia Oeste (15)
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar equipo o franquicia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Add Tier Action */}
          <button
            onClick={handleAddTier}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition ml-auto"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Añadir Nuevo Tier</span>
          </button>
        </div>

        {}

        {/* Tier List Canvas / Rows */}
        <div className="space-y-3">
          {tiers.map((tier, index) => (
            <div
              key={tier.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDropOnTier(tier.id)}
              className="flex flex-col md:flex-row rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-md transition group"
            >
              
              {/* Tier Left Header */}
              <div
                style={{ backgroundColor: tier.color }}
                className="w-full md:w-56 p-4 flex flex-col justify-between shrink-0 relative transition-all"
              >
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tier.name}
                    onChange={(e) => handleUpdateTierName(tier.id, e.target.value)}
                    className="bg-black/20 hover:bg-black/30 focus:bg-black/40 text-white font-extrabold text-sm md:text-base px-2 py-1 rounded w-full border border-transparent focus:border-white/40 focus:outline-none transition"
                  />
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={tier.color}
                      onChange={(e) => handleUpdateTierColor(tier.id, e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                      title="Cambiar color del Tier"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 bg-black/30 px-2 py-0.5 rounded-full">
                      {tier.teams.length} Equipos
                    </span>
                  </div>
                </div>

                {/* Tier Management Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-white/20 mt-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveTier(index, -1)}
                      disabled={index === 0}
                      className="p-1 hover:bg-black/20 rounded text-white disabled:opacity-30"
                      title="Mover arriba"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveTier(index, 1)}
                      disabled={index === tiers.length - 1}
                      className="p-1 hover:bg-black/20 rounded text-white disabled:opacity-30"
                      title="Mover abajo"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteTier(tier.id)}
                    className="p-1 hover:bg-red-500/40 rounded text-white transition"
                    title="Eliminar Tier"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tier Droppable Team Container */}
              <div className="flex-1 p-3 bg-slate-900/60 min-h-[100px] flex flex-wrap items-center gap-2.5">
                {tier.teams.length === 0 ? (
                  <div className="text-xs text-slate-600 italic px-4 py-6 text-center w-full">
                    Arrastra o haz clic en equipos para asignarlos a este nivel
                  </div>
                ) : (
                  tier.teams.map(teamId => {
                    const team = teams.find(t => t.id === teamId);
                    if (!team) return null;
                    if (confFilter !== 'ALL' && team.conf !== confFilter) return null;

                    return (
                      <TeamCard
                        key={team.id}
                        team={team}
                        onDragStart={(e) => handleDragStart(e, team.id)}
                        onDoubleClick={() => {
                          setSelectedTeam(team);
                          setSelectedTeamTab('roster');
                          setAiAnalysis(null);
                        }}
                        onRemove={() => handleQuickMove(team.id, 'unassigned')}
                      />
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>

        {}

        {/* Unassigned Team Pool */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                Pool de Equipos Sin Asignar ({unassignedTeams.length})
              </h2>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              💡 Tip: Doble clic en cualquier logo para abrir y editar el Roster 2026-2027
            </p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={() => handleDropOnTier('unassigned')}
            className="flex flex-wrap items-center gap-3 min-h-[120px] p-2 bg-slate-950/50 rounded-lg border border-dashed border-slate-800"
          >
            {unassignedTeams.length === 0 ? (
              <div className="text-xs text-slate-500 py-8 text-center w-full">
                ¡Todos los equipos seleccionados han sido colocados en la Tier List!
              </div>
            ) : (
              unassignedTeams.map(team => (
                <div key={team.id} className="group relative">
                  <TeamCard
                    team={team}
                    onDragStart={(e) => handleDragStart(e, team.id)}
                    onDoubleClick={() => {
                      setSelectedTeam(team);
                      setSelectedTeamTab('roster');
                      setAiAnalysis(null);
                    }}
                  />
                  {/* Quick Assign Popover */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:flex bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-1 z-30 gap-1">
                    {tiers.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleQuickMove(team.id, t.id)}
                        className="px-2 py-1 text-[10px] font-bold rounded text-white transition hover:scale-105"
                        style={{ backgroundColor: t.color }}
                      >
                        {t.name.substring(0, 2)}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>

      {/* Roster & AI Modal */}
      {selectedTeam && (
        <RosterModal
          team={selectedTeam}
          tab={selectedTeamTab}
          setTab={setSelectedTeamTab}
          onClose={() => setSelectedTeam(null)}
          onSaveTeam={(updatedTeam) => {
            setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
            setSelectedTeam(updatedTeam);
            showToast("Plantilla actualizada correctamente.");
          }}
          onAnalyzeAI={() => handleAnalyzeRosterWithAI(selectedTeam)}
          onUpdateRosterAI={() => handleUpdateRosterWithAI(selectedTeam)}
          aiLoading={aiLoading}
          aiAnalysis={aiAnalysis}
        />
      )}

      {/* Gemini API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowApiKeyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base">Clave API de Google Gemini</h3>
                <p className="text-xs text-slate-400">Modelo: gemini-3-flash-preview</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Para desbloquear el análisis táctico avanzado e inteligencia de rosters de la temporada 2026-2027, puedes ingresar tu API Key de Gemini o utilizar el entorno integrado.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">GEMINI_API_KEY</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setApiKey('');
                  localStorage.removeItem('GEMINI_API_KEY');
                  showToast("Clave eliminada.");
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Limpiar
              </button>
              <button
                onClick={() => {
                  setShowApiKeyModal(false);
                  showToast("Clave guardada exitosamente.");
                }}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl shadow transition"
              >
                Guardar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Team Card Sub-Component
function TeamCard({ team, onDragStart, onDoubleClick, onRemove }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDoubleClick={onDoubleClick}
      className="group relative bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/60 rounded-xl p-2 w-20 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-all transform hover:-translate-y-1 hover:shadow-lg hover:border-slate-500"
    >
      {/* Conference Tag indicator */}
      <span
        className={`absolute top-1 left-1 w-2 h-2 rounded-full ${team.conf === 'East' ? 'bg-blue-500' : 'bg-red-500'}`}
        title={`Conferencia ${team.conf}`}
      />

      {/* Remove button if inside tier */}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-black/60 hover:bg-red-600 text-white rounded-full p-0.5 transition"
          title="Quitar de este tier"
        >
          <X className="w-3 h-3" />
        </button>
      )}

      {/* Team Logo */}
      <img
        src={team.logo}
        alt={team.name}
        className="w-11 h-11 object-contain drop-shadow-md my-1 transition-transform group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://a.espncdn.com/i/teamlogos/nba/500/nba.png';
        }}
      />

      {/* Team Code */}
      <span className="text-[11px] font-extrabold text-slate-200 tracking-wider uppercase">
        {team.code}
      </span>
    </div>
  );
}

// Roster Modal Component
function RosterModal({
  team,
  tab,
  setTab,
  onClose,
  onSaveTeam,
  onAnalyzeAI,
  onUpdateRosterAI,
  aiLoading,
  aiAnalysis
}) {
  const [editableTeam, setEditableTeam] = useState(JSON.parse(JSON.stringify(team)));
  const [jsonText, setJsonText] = useState(JSON.stringify(team.roster, null, 2));

  // Sync state if team updates
  useEffect(() => {
    setEditableTeam(JSON.parse(JSON.stringify(team)));
    setJsonText(JSON.stringify(team.roster, null, 2));
  }, [team]);

  const handleRosterPlayerChange = (pos, index, value) => {
    const updated = { ...editableTeam };
    updated.roster[pos][index] = value;
    setEditableTeam(updated);
  };

  const handleAddPlayer = (pos) => {
    const updated = { ...editableTeam };
    updated.roster[pos].push('Nuevo Jugador');
    setEditableTeam(updated);
  };

  const handleRemovePlayer = (pos, index) => {
    const updated = { ...editableTeam };
    updated.roster[pos].splice(index, 1);
    setEditableTeam(updated);
  };

  const handleSaveEdit = () => {
    onSaveTeam(editableTeam);
  };

  const handleSaveJson = () => {
    try {
      const parsedRoster = JSON.parse(jsonText);
      const updated = { ...editableTeam, roster: parsedRoster };
      onSaveTeam(updated);
    } catch (e) {
      alert("JSON no válido. Revisa la sintaxis.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Banner Header */}
        <div
          style={{ backgroundColor: team.color }}
          className="p-5 relative flex items-center justify-between text-white shadow-md shrink-0"
        >
          <div className="flex items-center gap-4 z-10">
            <img
              src={team.logo}
              alt={team.name}
              className="w-16 h-16 object-contain bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2.5 py-0.5 rounded-full">
                  Conferencia {team.conf}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                  Temporada 2026 - 2027
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">{team.name}</h2>
              <p className="text-xs text-white/80 font-medium">Head Coach: <span className="font-bold">{editableTeam.coach}</span></p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setTab('roster')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${tab === 'roster' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Plantilla 2026-2027</span>
          </button>

          <button
            onClick={() => setTab('edit')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${tab === 'edit' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor Interactivo</span>
          </button>

          <button
            onClick={() => setTab('ai')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${tab === 'ai' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Análisis Gemini IA</span>
          </button>

          <button
            onClick={() => setTab('json')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${tab === 'json' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>JSON Roster</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB: ROSTER VIEW */}
          {tab === 'roster' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200">Roster Estimado por Posiciones</h3>
                <button
                  onClick={onUpdateRosterAI}
                  disabled={aiLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold rounded-lg transition disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Actualizar Intel Roster con IA</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(editableTeam.roster).map(([pos, players]) => (
                  <div key={pos} className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                      <span className="text-xs font-black text-indigo-400 tracking-wider">
                        {pos === 'PG' ? 'BASE (PG)' : pos === 'SG' ? 'ESCOLTA (SG)' : pos === 'SF' ? 'ALERO (SF)' : pos === 'PF' ? 'ALA-PÍVOT (PF)' : 'PÍVOT (C)'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">{players.length} jugadores</span>
                    </div>

                    <div className="space-y-1">
                      {players.map((player, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium py-1 px-2 rounded hover:bg-slate-900 transition">
                          <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-amber-400' : 'bg-slate-600'}`} />
                          <span>{player}</span>
                          {idx === 0 && <span className="text-[9px] text-amber-400 font-bold ml-auto uppercase bg-amber-400/10 px-1.5 py-0.5 rounded">Titular</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EDIT ROSTER */}
          {tab === 'edit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-200">Editor de Plantilla</h3>
                  <p className="text-xs text-slate-400">Modifica, añade o elimina jugadores para la temporada 2026-2027.</p>
                </div>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition"
                >
                  Guardar Cambios
                </button>
              </div>

              {/* Head Coach Input */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1">
                <label className="text-xs font-semibold text-slate-300">Entrenador Principal (Head Coach)</label>
                <input
                  type="text"
                  value={editableTeam.coach}
                  onChange={(e) => setEditableTeam({ ...editableTeam, coach: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Positions Editing */}
              <div className="space-y-3">
                {Object.entries(editableTeam.roster).map(([pos, players]) => (
                  <div key={pos} className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400">{pos}</span>
                      <button
                        onClick={() => handleAddPlayer(pos)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Añadir</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {players.map((player, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={player}
                            onChange={(e) => handleRosterPlayerChange(pos, idx, e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => handleRemovePlayer(pos, idx)}
                            className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GEMINI AI ANALYSIS */}
          {tab === 'ai' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-indigo-900/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-slate-200">Análisis Táctico e Intel IA (Gemini)</h3>
                  </div>
                  <button
                    onClick={onAnalyzeAI}
                    disabled={aiLoading}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow transition disabled:opacity-50 flex items-center gap-2"
                  >
                    {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Generar Informe Táctico 2026-2027</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400">
                  Obtén una proyección detallada sobre la plantilla, fortalezas, debilidades y opciones de playoffs evaluadas por Google Gemini.
                </p>
              </div>

              {aiLoading && (
                <div className="py-12 flex flex-col items-center justify-center space-y-3 text-slate-400">
                  <RefreshCw className="w-8 h-8 animate-spin text-indigo-500" />
                  <p className="text-xs font-semibold">Procesando roster y noticias con Gemini AI...</p>
                </div>
              )}

              {aiAnalysis && !aiLoading && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 leading-relaxed space-y-2 whitespace-pre-line font-sans">
                  {aiAnalysis}
                </div>
              )}
            </div>
          )}

          {/* TAB: JSON IMPORT/EXPORT */}
          {tab === 'json' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200">Editor JSON de Plantilla</h3>
                <button
                  onClick={handleSaveJson}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition"
                >
                  Aplicar JSON
                </button>
              </div>

              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                rows={12}
                className="w-full bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
          >
            Cerrar Ventana
          </button>
        </div>

      </div>
    </div>
  );
}
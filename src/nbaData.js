// src/nbaData.js

export const NBA_TEAMS = [
  // Conferencia Este
  { id: 'bos', name: 'Boston Celtics', city: 'Boston', conf: 'East', code: 'BOS', color: '#007A33', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png', coach: 'Joe Mazzulla',
    roster: {
      starters: ['Derrick White', 'Baylor Scheierman', 'Jayson Tatum', 'Paul George', 'Neemias Queta'],
      bench: ['Payton Pritchard', 'Jordan Walsh', 'Sam Hauser', 'Mitchell Robinson', 'Luka Garza']
    }
  },
  { id: 'nyk', name: 'New York Knicks', city: 'New York', conf: 'East', code: 'NYK', color: '#F58426', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/ny.png', coach: 'Tom Thibodeau',
    roster: {
      starters: ['Jalen Brunson', 'Mikal Bridges', 'OG Anunoby', 'Josh Hart', 'Karl-Anthony Towns'],
      bench: ['Miles McBride', 'Jose Alvarado', 'Jordan Clarkson', 'Andre Drummond', 'Landry Shamet']
    }
  },
  { id: 'phi', name: 'Philadelphia 76ers', city: 'Philadelphia', conf: 'East', code: 'PHI', color: '#006BB6', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/phi.png', coach: 'Nick Nurse',
    roster: {
      starters: ['Tyrese Maxey', 'VJ Edgecombe', 'LeBron James', 'Paul George', 'Joel Embiid'],
      bench: ['Anfernee Simons', 'Kentavious Caldwell-Pope.', 'Dean Wade', 'Dominick Barlow', 'Ariel Hukporti']
    }
  },
  { id: 'mil', name: 'Milwaukee Bucks', city: 'Milwaukee', conf: 'East', code: 'MIL', color: '#00471B', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/mil.png', coach: 'Doc Rivers',
    roster: {
      starters: ['Tyler Herro', 'Ryan Rollins', 'Jaime Jaquez Jr.', 'Myles Turner', 'Kyle Kuzma'],
      bench: ['Kevin Porter Jr.', 'Kel\'el Ware', 'Gary Trent Jr.', 'Kasparas Jakucionis', 'Ousmane Dieng']
    }
  },
  { id: 'cle', name: 'Cleveland Cavaliers', city: 'Cleveland', conf: 'East', code: 'CLE', color: '#860038', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/cle.png', coach: 'Kenny Atkinson',
    roster: {
      starters: ['James Harden', 'Donovan Mitchell', 'Peyton Watson', 'Evan Mobley', 'Jarrett Allen'],
      bench: ['Sam Merrill', 'Jaylon Tyson', 'Thomas Bryant', '	Tyrese Proctor', 'Craig Porter Jr.']
    }
  },
  { id: 'orl', name: 'Orlando Magic', city: 'Orlando', conf: 'East', code: 'ORL', color: '#0077C0', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/orl.png', coach: 'Jamahl Mosley',
    roster: {
      starters: ['Jalen Suggs', 'Desmond Bane', 'Franz Wagner', 'Paolo Banchero', 'Wendell Carter Jr.'],
      bench: ['Anthony Black', 'Tristan da Silva', 'Wendell Carter Jr.', 'Goga Bitadze', 'Jevon Carter']
    }
  },
  { id: 'ind', name: 'Indiana Pacers', city: 'Indiana', conf: 'East', code: 'IND', color: '#002D62', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/ind.png', coach: 'Rick Carlisle',
    roster: {
      starters: ['Tyrese Haliburton', 'Andrew Nembhard', 'Aaron Nesmith.', 'Pascal Siakam', 'Ivica Zubac'],
      bench: ['T.J. McConnell', 'Andrew Nembhard', 'Kelly Oubre Jr.', '	Obi Toppin', 'Larry Nance Jr.']
    }
  },
  { id: 'mia', name: 'Miami Heat', city: 'Miami', conf: 'East', code: 'MIA', color: '#98002E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png', coach: 'Erik Spoelstra',
    roster: {
      starters: ['Davion Mitchell', 'Klay Thompson', 'Andrew Wiggins', 'Giannis Antetokounmpo', 'Bam Adebayo'],
      bench: ['Tim Hardaway Jr.', 'Bobby Portis Jr.', 'Nikola Jović', 'Nick Richards', 'Pelle Larsson']
    }
  },
  { id: 'atl', name: 'Atlanta Hawks', city: 'Atlanta', conf: 'East', code: 'ATL', color: '#C8102E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/atl.png', coach: 'Quin Snyder',
    roster: {
      starters: ['CJ McCollum', 'Dyson Daniels', 'Nickeil Alexander-Walker', 'Jalen Johnson', 'Onyeka Okongwu'],
      bench: ['Luguentz Dort', 'Aaron Wiggins', '	Kingston Flemings', 'Corey Kispert', 'Jock Landale']
    }
  },
  { id: 'chi', name: 'Chicago Bulls', city: 'Chicago', conf: 'East', code: 'CHI', color: '#CE1141', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png', coach: 'Tiago Splitter',
    roster: {
      starters: ['Josh Giddey', 'Norman Powell', 'Isaac Okoro', 'Matas Buzelis', 'Nic Claxton'],
      bench: ['Buddy Hield', 'Patrick Williams', 'Tre Jones', 'Zach Collins', 'Jalen Smith']
    }
  },
  { id: 'tor', name: 'Toronto Raptors', city: 'Toronto', conf: 'East', code: 'TOR', color: '#CE1141', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/tor.png', coach: 'Darko Rajaković',
    roster: {
      starters: ['Immanuel Quickley', 'Kawhi Leonard', 'RJ Barrett', 'Scottie Barnes', 'Jakob Poeltl'],
      bench: ['Kyle Anderson', '	Jamal Shead', '	Trayce Jackson-Davis', 'Jamison Battle', 'Allen Graves']
    }
  },
  { id: 'bkn', name: 'Brooklyn Nets', city: 'Brooklyn', conf: 'East', code: 'BKN', color: '#000000', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/bkn.png', coach: 'Jordi Fernández',
    roster: {
      starters: ['Mikel Brown Jr.', 'Egor Demin', 'Michael Porter Jr.', 'Julius Randle', 'Day\'Ron Sharpe'],
      bench: ['	Ben Saraf', 'Danny Wolf', 'Drake Powell', 'Terance Mann', '	Keon Ellis']
    }
  },
  { id: 'det', name: 'Detroit Pistons', city: 'Detroit', conf: 'East', code: 'DET', color: '#1D428A', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/det.png', coach: 'J.B. Bickerstaff',
    roster: {
      starters: ['Cade Cunningham', 'Duncan Robinson', 'Ausar Thompson', 'John Collins', 'Jalen Duren'],
      bench: ['Isaiah Joe', 'Kevin Huerter', 'Taurean Prince', 'Ronald Holland II', 'Paul Reed']
    }
  },
  { id: 'cha', name: 'Charlotte Hornets', city: 'Charlotte', conf: 'East', code: 'CHA', color: '#1D1160', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/cha.png', coach: 'Charles Lee',
    roster: {
      starters: ['Coby White', 'Hannes Steinbach', 'Kon Knueppel', 'Royce O\'Neale', 'Naz Reid'],
      bench: ['Grant Williams', 'Sion James', 'Christian Anderson', '	Dennis Schroder', 'Royce O\'Neale']
    }
  },
  { id: 'was', name: 'Washington Wizards', city: 'Washington', conf: 'East', code: 'WAS', color: '#002B5C', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/was.png', coach: 'Brian Keefe',
    roster: {
      starters: ['Trae Young', 'Kyshawn George', 'AJ Dybantsa', 'Anthony Davis', 'Alex Sarr'],
      bench: ['Bub Carrington', '	Tre Johnson', 'Khris Middleton', 'Tristan Vukcevic', 'Tre Mann']
    }
  },

  // Conferencia Oeste
  { id: 'okc', name: 'Oklahoma City Thunder', city: 'Oklahoma City', conf: 'West', code: 'OKC', color: '#007AC1', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/okc.png', coach: 'Mark Daigneault',
    roster: {
      starters: ['Shai Gilgeous-Alexander', 'Cason Wallace', 'Jalen Williams', 'Chet Holmgren', 'Isaiah Hartenstein'],
      bench: ['Alex Caruso', 'Cason Wallace', 'Jaylin Williams', 'Ajay Mitchell', 'Jared McCain']
    }
  },
  { id: 'den', name: 'Denver Nuggets', city: 'Denver', conf: 'West', code: 'DEN', color: '#0E2240', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/den.png', coach: 'David Adelman',
    roster: {
      starters: ['Jamal Murray', 'Christian Braun', 'Cameron Johnson', 'Aaron Gordon', 'Nikola Jokić'],
      bench: ['Tyus Jones', 'DeMar DeRozan', 'Marvin Bagley III', 'Julian Strawther', '	Spencer Jones']
    }
  },
  { id: 'min', name: 'Minnesota Timberwolves', city: 'Minnesota', conf: 'West', code: 'MIN', color: '#0C2340', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/min.png', coach: 'Chris Finch',
    roster: {
      starters: ['LaMelo Ball', 'Anthony Edwards', 'Jaden McDaniels', 'Jonathan Kuminga', 'Rudy Gobert'],
      bench: ['	Isaiah Evans', 'Ayo Dosunmu', 'Bones Hyland', 'Enrique Freeman', 'Terrence Shannon Jr.']
    }
  },
  { id: 'dal', name: 'Dallas Mavericks', city: 'Dallas', conf: 'West', code: 'DAL', color: '#00538C', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/dal.png', coach: 'Jason Kidd',
    roster: {
      starters: ['Kyrie Irving', 'Max Christie', 'Cooper Flagg', 'P.J. Washington', 'Dereck Lively II'],
      bench: ['Naji Marshall', 'Marcus Sasser', 'Zaccharie Risacher', 'Morez Johnson Jr.', 'Daniel Gafford']
    }
  },
  { id: 'phx', name: 'Phoenix Suns', city: 'Phoenix', conf: 'West', code: 'PHX', color: '#1D1160', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/phx.png', coach: 'Mike Budenholzer',
    roster: {
      starters: ['Devin Booker', 'Jalen Green', 'Miles Bridges', 'Dillon Brooks', 'Oso Ighodaro'],
      bench: ['Luke Kennard', 'Ryan Dunn', 'Khaman Maluach', 'Collin Gillespie', 'Koa Peat']
    }
  },
  { id: 'lal', name: 'Los Angeles Lakers', city: 'Los Angeles', conf: 'West', code: 'LAL', color: '#552583', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png', coach: 'JJ Redick',
    roster: {
      starters: ['Jake LaRavia', 'Austin Reaves', 'Quentin Grimes', 'Luka Dončić', 'Walker Kessler'],
      bench: ['Quentin Grimes', 'Matisse Thybulle', 'Dalton Knecht', 'Collin Sexton', 'Kevon Looney']
    }
  },
  { id: 'gs', name: 'Golden State Warriors', city: 'Golden State', conf: 'West', code: 'GS', color: '#1D428A', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', coach: 'Steve Kerr',
    roster: {
      starters: ['Stephen Curry', 'Brandin Podziemski', 'Gui Santos', 'Draymond Green', 'Kristaps Porziņģis'],
      bench: ['De\'Anthony Melton', 'Yaxel Lendeborg', 'Al Horford', 'Gary Payton II', 'Brandon Williams']
    }
  },
  { id: 'sac', name: 'Sacramento Kings', city: 'Sacramento', conf: 'West', code: 'SAC', color: '#5A2D81', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/sac.png', coach: 'Mike Brown',
    roster: {
      starters: ['Darius Acuff Jr.', 'Zach LaVine', 'Keegan Murray', 'Domantas Sabonis', 'De\'Andre Hunter'],
      bench: ['Malik Monk', 'Ben Simmons', 'Nique Clifford', 'Malik Monk', 'Daeqwon Plowden']
    }
  },
  { id: 'hou', name: 'Houston Rockets', city: 'Houston', conf: 'West', code: 'HOU', color: '#CE1141', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/hou.png', coach: 'Ime Udoka',
    roster: {
      starters: ['Fred VanVleet', 'Amen Thompson', 'Kevin Durant', 'Jabari Smith Jr.', 'Alperen Sengun'],
      bench: ['Marcus Smart', 'Reed Sheppard', 'Bogdan Bogdanović', 'Marcus Smart', 'Tari Eason']
    }
  },
  { id: 'mem', name: 'Memphis Grizzlies', city: 'Memphis', conf: 'West', code: 'MEM', color: '#5D76A9', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/mem.png', coach: 'Taylor Jenkins',
    roster: {
      starters: ['Scotty Pippen Jr.', 'Cedric Coward', 'Jerami Grant', 'Cameron Boozer', 'Zach Edey'],
      bench: ['	Karim Lopez', 'Quinten Post', 'Isaiah Stewart', 'GG Jackson', 'Jerami Grant']
    }
  },
  { id: 'lac', name: 'LA Clippers', city: 'Los Angeles', conf: 'West', code: 'LAC', color: '#C8102E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lac.png', coach: 'Tyronn Lue',
    roster: {
      starters: ['Darius Garland', 'Keaton Wagler', 'Derrick Jones Jr.', 'Brandon Ingram', 'Brook Lopez'],
      bench: ['Max Strus', 'Bradley Beal', 'Kris Dunn', 'Rui Hachimura', 'Isaiah Jackson']
    }
  },
  { id: 'nop', name: 'New Orleans Pelicans', city: 'New Orleans', conf: 'West', code: 'NOP', color: '#0C2340', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/no.png', coach: 'Willie Green',
    roster: {
      starters: ['Trey Murphy III', 'Dejounte Murray', 'Herbert Jones', 'Zion Williamson', 'Saddiq Bey'],
      bench: ['	Jeremiah Fears', 'Bennedict Mathurin', 'Derik Queen', 'Yves Missi', 'Karlo Matkovic']
    }
  },
  { id: 'sas', name: 'San Antonio Spurs', city: 'San Antonio', conf: 'West', code: 'SAS', color: '#C4CED4', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/sa.png', coach: 'Mitch Johnson',
    roster: {
      starters: ['Stephon Castle', 'Devin Vassell', 'De\'Aaron Fox', 'Tobias Harris', 'Victor Wembanyama'],
      bench: ['Keldon Johnson', '	Dylan Harper', 'Jeremy Sochan', 'Harrison Barnes', 'Jordan McLaughlin']
    }
  },
  { id: 'uta', name: 'Utah Jazz', city: 'Utah', conf: 'West', code: 'UTA', color: '#002B5C', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/uta.png', coach: 'Will Hardy',
    roster: {
      starters: ['Keyonte George', 'Darryn Peterson', 'Jaren Jackson Jr.', 'Lauri Markkanen', 'Jusuf Nurkić'],
      bench: ['Kyle Filipowski', 'Josh Okogie', 'Jaxson Hayes', 'Ace Bailey', 'Mo Bamba']
    }
  },
  { id: 'por', name: 'Portland Trail Blazers', city: 'Portland', conf: 'West', code: 'POR', color: '#E03A3E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/por.png', coach: 'Chauncey Billups',
    roster: {
      starters: ['Ja Morant', 'Damian Lillard', 'Toumani Camara', 'Deni Avdija', 'Donovan Clingan'],
      bench: ['Scoot Henderson', 'Jrue Holiday', 'Jeremy Sochan', '	Robert Williams III', 'Micah Potter']
    }
  }
];
export const DEFAULT_TIERS = [
  { id: 'tier-s', name: 'S - Contendientes al Título 🏆', color: '#f59e0b', teams: ['bos', 'okc', 'nyk', 'den'] },
  { id: 'tier-a', name: 'A - Playoffs Directos 🏀', color: '#10b981', teams: ['min', 'dal', 'phi', 'mil', 'cle', 'phx'] },
  { id: 'tier-b', name: 'B - Play-In Tournament ⚡', color: '#3b82f6', teams: ['lal', 'gs', 'mia', 'ind', 'orl', 'sac', 'hou', 'mem'] },
  { id: 'tier-c', name: 'C - En Lucha / Reconstrucción 🎯', color: '#8b5cf6', teams: ['sas', 'atl', 'nop', 'lac', 'chi', 'tor'] },
  { id: 'tier-d', name: 'D - Tanking / Desarrollo 🛠️', color: '#64748b', teams: ['bkn', 'det', 'cha', 'was', 'uta', 'por'] }
];
// src/nbaData.js

export const NBA_TEAMS = [
  // Conferencia Este
  { id: 'bos', name: 'Boston Celtics', city: 'Boston', conf: 'East', code: 'BOS', color: '#007A33', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png', coach: 'Joe Mazzulla',
    roster: {
      starters: ['Jrue Holiday', 'Derrick White', 'Jaylen Brown', 'Jayson Tatum', 'Kristaps Porzingis'],
      bench: ['Payton Pritchard', 'Baylor Scheierman', 'Sam Hauser', 'Oshae Brissett', 'Al Horford']
    }
  },
  { id: 'nyk', name: 'New York Knicks', city: 'New York', conf: 'East', code: 'NYK', color: '#F58426', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/ny.png', coach: 'Tom Thibodeau',
    roster: {
      starters: ['Jalen Brunson', 'Mikal Bridges', 'OG Anunoby', 'Josh Hart', 'Karl-Anthony Towns'],
      bench: ['Miles McBride', 'Cameron Payne', 'Pacome Dadiet', 'Precious Achiuwa', 'Mitchell Robinson']
    }
  },
  { id: 'phi', name: 'Philadelphia 76ers', city: 'Philadelphia', conf: 'East', code: 'PHI', color: '#006BB6', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/phi.png', coach: 'Nick Nurse',
    roster: {
      starters: ['Tyrese Maxey', 'Kelly Oubre Jr.', 'Paul George', 'Caleb Martin', 'Joel Embiid'],
      bench: ['Kyle Lowry', 'Jared McCain', 'KJ Martin', 'Guerschon Yabusele', 'Andre Drummond']
    }
  },
  { id: 'mil', name: 'Milwaukee Bucks', city: 'Milwaukee', conf: 'East', code: 'MIL', color: '#00471B', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/mil.png', coach: 'Doc Rivers',
    roster: {
      starters: ['Damian Lillard', 'Gary Trent Jr.', 'Khris Middleton', 'Giannis Antetokounmpo', 'Brook Lopez'],
      bench: ['Delon Wright', 'AJ Green', 'Taurean Prince', 'Tyler Smith', 'Bobby Portis']
    }
  },
  { id: 'cle', name: 'Cleveland Cavaliers', city: 'Cleveland', conf: 'East', code: 'CLE', color: '#860038', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/cle.png', coach: 'Kenny Atkinson',
    roster: {
      starters: ['Darius Garland', 'Donovan Mitchell', 'Max Strus', 'Evan Mobley', 'Jarrett Allen'],
      bench: ['Ty Jerome', 'Caris LeVert', 'Isaac Okoro', 'Georges Niang', 'Dean Wade']
    }
  },
  { id: 'orl', name: 'Orlando Magic', city: 'Orlando', conf: 'East', code: 'ORL', color: '#0077C0', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/orl.png', coach: 'Jamahl Mosley',
    roster: {
      starters: ['Jalen Suggs', 'Kentavious Caldwell-Pope', 'Franz Wagner', 'Paolo Banchero', 'Wendell Carter Jr.'],
      bench: ['Cole Anthony', 'Anthony Black', 'Tristan da Silva', 'Jonathan Isaac', 'Goga Bitadze']
    }
  },
  { id: 'ind', name: 'Indiana Pacers', city: 'Indiana', conf: 'East', code: 'IND', color: '#002D62', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/ind.png', coach: 'Rick Carlisle',
    roster: {
      starters: ['Tyrese Haliburton', 'Andrew Nembhard', 'Aaron Nesmith', 'Pascal Siakam', 'Myles Turner'],
      bench: ['TJ McConnell', 'Ben Sheppard', 'Bennedict Mathurin', 'Jarace Walker', 'Isaiah Jackson']
    }
  },
  { id: 'mia', name: 'Miami Heat', city: 'Miami', conf: 'East', code: 'MIA', color: '#98002E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png', coach: 'Erik Spoelstra',
    roster: {
      starters: ['Terry Rozier', 'Duncan Robinson', 'Jimmy Butler', 'Nikola Jović', 'Bam Adebayo'],
      bench: ['Tyler Herro', 'Alec Burks', 'Jaime Jaquez Jr.', 'Haywood Highsmith', "Kel'el Ware"]
    }
  },
  { id: 'atl', name: 'Atlanta Hawks', city: 'Atlanta', conf: 'East', code: 'ATL', color: '#C8102E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/atl.png', coach: 'Quin Snyder',
    roster: {
      starters: ['Trae Young', 'Dyson Daniels', 'Zaccharie Risacher', 'Jalen Johnson', 'Clint Capela'],
      bench: ['Kobe Bufkin', 'Bogdan Bogdanović', "De'Andre Hunter", 'Larry Nance Jr.', 'Onyeka Okongwu']
    }
  },
  { id: 'chi', name: 'Chicago Bulls', city: 'Chicago', conf: 'East', code: 'CHI', color: '#CE1141', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png', coach: 'Billy Donovan',
    roster: {
      starters: ['Coby White', 'Josh Giddey', 'Zach LaVine', 'Patrick Williams', 'Nikola Vučević'],
      bench: ['Lonzo Ball', 'Ayo Dosunmu', 'Matas Buzelis', 'Torrey Craig', 'Jalen Smith']
    }
  },
  { id: 'tor', name: 'Toronto Raptors', city: 'Toronto', conf: 'East', code: 'TOR', color: '#CE1141', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/tor.png', coach: 'Darko Rajaković',
    roster: {
      starters: ['Immanuel Quickley', 'Gradey Dick', 'RJ Barrett', 'Scottie Barnes', 'Jakob Poeltl'],
      bench: ['Davion Mitchell', "Ja'Kobe Walter", 'Ochai Agbaji', 'Chris Boucher', 'Kelly Olynyk']
    }
  },
  { id: 'bkn', name: 'Brooklyn Nets', city: 'Brooklyn', conf: 'East', code: 'BKN', color: '#000000', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/bkn.png', coach: 'Jordi Fernández',
    roster: {
      starters: ['Dennis Schröder', 'Cam Thomas', 'Bojan Bogdanović', 'Cameron Johnson', 'Nic Claxton'],
      bench: ['Ben Simmons', 'Keon Johnson', 'Ziaire Williams', 'Trendon Watford', "Day'Ron Sharpe"]
    }
  },
  { id: 'det', name: 'Detroit Pistons', city: 'Detroit', conf: 'East', code: 'DET', color: '#1D428A', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/det.png', coach: 'J.B. Bickerstaff',
    roster: {
      starters: ['Cade Cunningham', 'Malik Beasley', 'Ausar Thompson', 'Tobias Harris', 'Jalen Duren'],
      bench: ['Jaden Ivey', 'Marcus Sasser', 'Tim Hardaway Jr.', 'Ron Holland', 'Isaiah Stewart']
    }
  },
  { id: 'cha', name: 'Charlotte Hornets', city: 'Charlotte', conf: 'East', code: 'CHA', color: '#1D1160', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/cha.png', coach: 'Charles Lee',
    roster: {
      starters: ['LaMelo Ball', 'Brandon Miller', 'Cody Martin', 'Miles Bridges', 'Nick Richards'],
      bench: ['Tre Mann', 'Josh Green', 'Tidjane Salaün', 'Grant Williams', 'Mark Williams']
    }
  },
  { id: 'was', name: 'Washington Wizards', city: 'Washington', conf: 'East', code: 'WAS', color: '#002B5C', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/was.png', coach: 'Brian Keefe',
    roster: {
      starters: ['Malcolm Brogdon', 'Jordan Poole', 'Bilal Coulibaly', 'Kyle Kuzma', 'Jonas Valančiūnas'],
      bench: ['Bub Carrington', 'Corey Kispert', 'Sadraque Nganga', 'Alex Sarr', 'Richaun Holmes']
    }
  },

  // Conferencia Oeste
  { id: 'okc', name: 'Oklahoma City Thunder', city: 'Oklahoma City', conf: 'West', code: 'OKC', color: '#007AC1', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/okc.png', coach: 'Mark Daigneault',
    roster: {
      starters: ['Shai Gilgeous-Alexander', 'Lu Dort', 'Jalen Williams', 'Chet Holmgren', 'Isaiah Hartenstein'],
      bench: ['Alex Caruso', 'Cason Wallace', 'Aaron Wiggins', 'Ousmane Dieng', 'Jaylin Williams']
    }
  },
  { id: 'den', name: 'Denver Nuggets', city: 'Denver', conf: 'West', code: 'DEN', color: '#0E2240', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/den.png', coach: 'Michael Malone',
    roster: {
      starters: ['Jamal Murray', 'Christian Braun', 'Michael Porter Jr.', 'Aaron Gordon', 'Nikola Jokić'],
      bench: ['Russell Westbrook', 'Julian Strawther', 'Peyton Watson', 'Vlatko Čančar', 'Dario Šarić']
    }
  },
  { id: 'min', name: 'Minnesota Timberwolves', city: 'Minnesota', conf: 'West', code: 'MIN', color: '#0C2340', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/min.png', coach: 'Chris Finch',
    roster: {
      starters: ['Mike Conley', 'Anthony Edwards', 'Jaden McDaniels', 'Julius Randle', 'Rudy Gobert'],
      bench: ['Rob Dillingham', 'Donte DiVincenzo', 'Terrence Shannon Jr.', 'Naz Reid', 'Luka Garza']
    }
  },
  { id: 'dal', name: 'Dallas Mavericks', city: 'Dallas', conf: 'West', code: 'DAL', color: '#00538C', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/dal.png', coach: 'Jason Kidd',
    roster: {
      starters: ['Luka Dončić', 'Kyrie Irving', 'Klay Thompson', 'P.J. Washington', 'Dereck Lively II'],
      bench: ['Spencer Dinwiddie', 'Jaden Hardy', 'Naji Marshall', 'Maxi Kleber', 'Daniel Gafford']
    }
  },
  { id: 'phx', name: 'Phoenix Suns', city: 'Phoenix', conf: 'West', code: 'PHX', color: '#1D1160', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/phx.png', coach: 'Mike Budenholzer',
    roster: {
      starters: ['Tyus Jones', 'Devin Booker', 'Bradley Beal', 'Kevin Durant', 'Jusuf Nurkić'],
      bench: ['Monte Morris', 'Grayson Allen', "Royce O'Neale", 'Ryan Dunn', 'Mason Plumlee']
    }
  },
  { id: 'lal', name: 'Los Angeles Lakers', city: 'Los Angeles', conf: 'West', code: 'LAL', color: '#552583', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png', coach: 'JJ Redick',
    roster: {
      starters: ["D'Angelo Russell", 'Austin Reaves', 'LeBron James', 'Rui Hachimura', 'Anthony Davis'],
      bench: ['Gabe Vincent', 'Dalton Knecht', 'Max Christie', 'Jarred Vanderbilt', 'Jaxson Hayes']
    }
  },
  { id: 'gs', name: 'Golden State Warriors', city: 'Golden State', conf: 'West', code: 'GS', color: '#1D428A', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', coach: 'Steve Kerr',
    roster: {
      starters: ['Stephen Curry', 'Brandin Podziemski', 'Jonathan Kuminga', 'Draymond Green', 'Kevon Looney'],
      bench: ["De'Anthony Melton", 'Buddy Hield', 'Moses Moody', 'Kyle Anderson', 'Trayce Jackson-Davis']
    }
  },
  { id: 'sac', name: 'Sacramento Kings', city: 'Sacramento', conf: 'West', code: 'SAC', color: '#5A2D81', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/sac.png', coach: 'Mike Brown',
    roster: {
      starters: ["De'Aaron Fox", 'Keon Ellis', 'DeMar DeRozan', 'Keegan Murray', 'Domantas Sabonis'],
      bench: ['Devin Carter', 'Malik Monk', 'Kevin Huerter', 'Trey Lyles', 'Alex Len']
    }
  },
  { id: 'hou', name: 'Houston Rockets', city: 'Houston', conf: 'West', code: 'HOU', color: '#CE1141', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/hou.png', coach: 'Ime Udoka',
    roster: {
      starters: ['Fred VanVleet', 'Jalen Green', 'Dillon Brooks', 'Jabari Smith Jr.', 'Alperen Şengün'],
      bench: ['Reed Sheppard', 'Amen Thompson', 'Cam Whitmore', 'Tari Eason', 'Steven Adams']
    }
  },
  { id: 'mem', name: 'Memphis Grizzlies', city: 'Memphis', conf: 'West', code: 'MEM', color: '#5D76A9', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/mem.png', coach: 'Taylor Jenkins',
    roster: {
      starters: ['Ja Morant', 'Desmond Bane', 'Marcus Smart', 'Jaren Jackson Jr.', 'Zach Edey'],
      bench: ['Scotty Pippen Jr.', 'Luke Kennard', 'Vince Williams Jr.', 'GG Jackson', 'Brandon Clarke']
    }
  },
  { id: 'lac', name: 'LA Clippers', city: 'Los Angeles', conf: 'West', code: 'LAC', color: '#C8102E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lac.png', coach: 'Tyronn Lue',
    roster: {
      starters: ['James Harden', 'Norman Powell', 'Kawhi Leonard', 'Derrick Jones Jr.', 'Ivica Zubac'],
      bench: ['Kris Dunn', 'Terance Mann', 'Amir Coffey', 'Nicolas Batum', 'Mo Bamba']
    }
  },
  { id: 'nop', name: 'New Orleans Pelicans', city: 'New Orleans', conf: 'West', code: 'NOP', color: '#0C2340', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/no.png', coach: 'Willie Green',
    roster: {
      starters: ['Dejounte Murray', 'CJ McCollum', 'Brandon Ingram', 'Zion Williamson', 'Daniel Theis'],
      bench: ['Jose Alvarado', 'Jordan Hawkins', 'Trey Murphy III', 'Herbert Jones', 'Yves Missi']
    }
  },
  { id: 'sas', name: 'San Antonio Spurs', city: 'San Antonio', conf: 'West', code: 'SAS', color: '#C4CED4', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/sa.png', coach: 'Gregg Popovich',
    roster: {
      starters: ['Chris Paul', 'Stephon Castle', 'Devin Vassell', 'Jeremy Sochan', 'Victor Wembanyama'],
      bench: ['Tre Jones', 'Malaki Branham', 'Julian Champagnie', 'Harrison Barnes', 'Zach Collins']
    }
  },
  { id: 'uta', name: 'Utah Jazz', city: 'Utah', conf: 'West', code: 'UTA', color: '#002B5C', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/uta.png', coach: 'Will Hardy',
    roster: {
      starters: ['Keyonte George', 'Collin Sexton', 'Lauri Markkanen', 'John Collins', 'Walker Kessler'],
      bench: ['Isaiah Collier', 'Jordan Clarkson', 'Cody Williams', 'Taylor Hendricks', 'Drew Eubanks']
    }
  },
  { id: 'por', name: 'Portland Trail Blazers', city: 'Portland', conf: 'West', code: 'POR', color: '#E03A3E', logo: 'https://a.espncdn.com/i/teamlogos/nba/500/por.png', coach: 'Chauncey Billups',
    roster: {
      starters: ['Scoot Henderson', 'Shaedon Sharpe', 'Deni Avdija', 'Jerami Grant', 'Deandre Ayton'],
      bench: ['Anfernee Simons', 'Matisse Thybulle', 'Toumani Camara', 'Kris Murray', 'Donovan Clingan']
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
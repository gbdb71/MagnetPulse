var levels = [

// Level 1 (0)
["WWWWWWW..WWWWWWW",
 "WWWWWWWXXWWWWWWW",
 "WWWW........WWWW",
 "WWWW........WWWW",
 "WWWW.....x..WWWW",
 "WWWW........WWWW",
 "WWWW........WWWW",
 "WWWW........WWWW",
 "WWWW.Q......WWWW",
 "WWWW........WWWW",
 "WWWW........WWWW",
 "WWWW..b.....WWWW",
 "WWWW........WWWW",
 "WWWW........WWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW"],
 
 // Level 2 (1)
["WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WW.......x...WWW",
 "WWHHHHHHHHHHHWWW",
 "WW.......n...XY.",
 "WW...........XY.",
 "WW........y..WWW",
 "WW...........WWW",
 "WW........WWWWWW",
 "WW..b.....WWWWWW",
 "WW........WWWWWW",
 "WW.Q......WWWWWW",
 "WWWWWWW..WWWWWWW"],
 
 // Level 3 (1)
["WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWW..x.......WWW",
 "WWWHHHHHHHHHHWWW",
 "WWW..........WWW",
 "WWW.......n..WWW",
 "WWW..........WWW",
 ".............XY.",
 ".............XY.",
 "WWW.......y..WWW",
 "WWW..b.......WWW",
 "WWW.........QWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW"],
 
// Level 4 (1)
["WWWWWWWWWWWWWWWW",
 "WWWWWWWW.x.WWWWW",
 "WWWWWWWW.H.WWWWW",
 "WWWWWWWW.H.WWWWW",
 "WWWWWWWW.n.WWWWW",
 "WWWWWWWWWWWWWWWW",
 "W....Q.......WWW",
 ".............XY.",
 ".............XY.",
 "W............WWW",
 "W..b......y..WWW",
 "W............WWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW"],

// Level 5 (2)
["WWWWWWWWWWWWWWWW",
 "WWW.x.WWWWWWWWWW",
 "WWW.H.WWWWWWWWWW",
 "WWW.n.WWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "W....b....z.WWWW",
 "W...........WWWW",
 "............XYZ.",
 "............XYZ.",
 "W...........WWWW",
 "WQ..........WWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWW.y.WWWWW",
 "WWWWWWWW.H.WWWWW",
 "WWWWWWWW.s.WWWWW",
 "WWWWWWWWWWWWWWWW"],
 
 // Level 6 (1)
["WWWWWWWWWWWWWWWW",
 "WWWW.s.WWWWWWWWW",
 "WWWW.H.WWWWWWWWW",
 "WWWW.x.WWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "W.........WWWWWW",
 "W......z..WWWWWW",
 "..........W....W",
 "..........WyHHsW",
 "W...b.....W....W",
 "W.........WWWWWW",
 "W.........WWWWWW",
 "WWW.WWWXXWWWWWWW",
 "WW...WWYYWWWWWWW",
 "WW.Q.WWZZWWWWWWW",
 "WWWWWWW..WWWWWWW"],
 
 // Level 7 (1)
["WWWWWWW..WWWWWWW",
 "WWW............W",
 "WWW............W",
 "WWW............W",
 "WWW........y...W",
 "WWW............W",
 "WWW............W",
 ".YX............W",
 ".YX............W",
 "WWW...x........W",
 "WWW........b...W",
 "WWWWW...WWHHHWWW",
 "WWW.....WW...WWW",
 "WWW.WWWWWW...WWW",
 "WWW...QWWW.s.WWW",
 "WWWWWWWWWWWWWWWW"],
 
  // Level 8 (1)
["WWWWWWWWWWWWWWWW",
 "WQ.............W",
 "W..............W",
 "W..............W",
 "W..............W",
 "W..............W",
 "WWW...y........W",
 ".YX.............",
 ".YX.............",
 "WWW...x........W",
 "W.........n....W",
 "W.......WWHHHWWW",
 "W.......WW...WWW",
 "WWWWWWWWWW...WWW",
 "WWWWWWWWWW..sWWW",
 "WWWWWWWWWWWWWWWW"],
 
 // Level 9 (4)
["WWWWWWWWWWWWWWWW",
 "W..............W",
 "W.............QW",
 "W..............W",
 "W...WWWWWWWW...W",
 "W...WsWWyW.W...W",
 "W...W.WW.W.W...W",
 "W...W.WW.W.W....",
 "W...W.WW.WnW....",
 "W...W.WW.W.W...W",
 "W...W.X..WxW...W",
 "W...WWWWWWWW...W",
 "W..............W",
 "W..............W",
 "W.....WYYW.....W",
 "WWWWWWW..WWWWWWW"],
 
  // Level 10 (2)
["WWWWWWW..WWWWWWW",
 "WWWWWWW..WWWWWWW",
 "WWWWWWQ..WWWWWWW",
 "WWWW........WWWW",
 "WWWW...H..n.WWWW",
 "WWWWHH...HHHWWWW",
 "WWWWxnH.H.HyWWWW",
 "WWWWHH.....HWWWW",
 "WWWW...W....WWWW",
 "WWWW..HzH...WWWW",
 "WWWW...H.b..WWWW",
 "WWWW......s.WWWW",
 "WWWWWWWXXWWWWWWW",
 "WWWWWWWYYWWWWWWW",
 "WWWWWWWZZWWWWWWW",
 "WWWWWWW..WWWWWWW"],
 
   // Level 11 (2)
["WWWWWWW..WWWWWWW",
 "WWWWWWW..WWWWWWW",
 "WWWWQ..........W",
 "WWWWWWWWWWWWWW.W",
 "WWWWWWWWWWWWWW.W",
 "WWWW....W.sxWW.W",
 "WWWWWWWXW...WW.W",
 "..WWyH.........W",
 "..WWHH...b..WWWW",
 "W.WW........WWWW",
 "W.WWWWWYWWWWWWWW",
 "W.WWWWW.WWWWWWWW",
 "W.......WWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW"],
 
 // Level 12 (2)
["WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWQ.WWW",
 "WWWWWWWWWW....WW",
 "WWWWWWWWW......W",
 "WWWWWWWWW.WWWW.W",
 "WWW..H.....X.W.W",
 "..W.WyH....W.W..",
 "..W..H.....b.W..",
 "W.W....s..xWWWWW",
 "W.WYWWWWWWWWWWWW",
 "W...WWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW"],
 
 // Level 13 (3) 
["WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWWWWWWWWWWWW",
 "WWWWWW.....WWWWW",
 "WWWW...W.W...WWW",
 "WWWW.H.....H.WWW",
 "WWWW...H.H..WWWW",
 "WWWW.bxWXW..WWQ.",
 "WWWW...WYWybWW..",
 "WWWW.HH..H...W.W",
 "WWWW.nH..H...W.W",
 "WWWWZWWWHW.....W",
 "WWWW.WWWzWWWWWWW",
 "WWWW.WWWWWWWWWWW",
 "WWWW.....WWWWWWW",
 "WWWWWWW..WWWWWWW"],
 
 // Level 14 (4)
["WWWWWWW..WWWWWWW",
 "W.............QW",
 "WWWWWWWWWWWW...W",
 "W.X........W...W",
 "W......W.W.W...W",
 "W....W.W.WHW...W",
 "W....W.W.W....WW",
 "W......b.WnW..Z.",
 "W..XHX...WxW..Z.",
 "W.YYYYYWWWWW..WW",
 "W...H...X......W",
 "W.H...HWWWWWWW.W",
 "WXzH.....Wy..W.W",
 "W.H..XYb.W.WWW.W",
 "W........WsW...W",
 "WWWWWWWWWWWWWWWW"],
 
 // Level 15 (0) End Screen
["WWWWWWWWWWWWWWWW",
 "WWWWWWWxYWWWWWWW",
 "WWWWWW....WWWWWW",
 "WWWWW......WWWWW",
 "WWWW.b....n.WWWW",
 "WWW..........WWW",
 "WW............WW",
 "..............zW",
 "..............XW",
 "WW............WW",
 "WWW..........WWW",
 "WWWW.Q....s.WWWW",
 "WWWWW......WWWWW",
 "WWWWWW....WWWWWW",
 "WWWWWWWyZWWWWWWW",
 "WWWWWWWWWWWWWWWW"],


 ]


 var levelInfo = [
 	{advance: "up", charges: 0, text: "Welcome to Polarized! Press R to reset."},
 	{advance: "right", charges: 1, text: "Spacebar to magnet pulse! Careful, it's limited."},
 	{advance: "right", charges: 1, text: "Nice job so far! Make sure to use your pulses wisely."},
 	{advance: "right", charges: 1, text: "Magnetic force is not stopped by walls... Cool!"},
 	{advance: "right", charges: 2, text: "That's a negative magnetic block."},
 	{advance: "down", charges: 1, text: "Two blocks but one pulse. Is it possible?"},
 	{advance: "left", charges: 1, text: "Negative magnets are dangerous."},
 	{advance: "left", charges: 1, text: "Will the same trick work again?"},
 	{advance: "down", charges: 4, text: "This is the Magnet Maze!"},
 	{advance: "down", charges: 2, text: "This one looks tricky! Careful around the pits!"},
 	{advance: "left", charges: 2, text: "With your expertise, this one should be no problem."},
 	{advance: "left", charges: 2, text: "Even I had trouble with this one."},
 	{advance: "down", charges: 3, text: "A very difficult puzzle! Try thinking backwards."},
 	{advance: "right", charges: 4, text: "The final challenge."},
 	{advance: "right", charges: 4, text: "Hooray! You win!"},
 ]
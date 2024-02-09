var sourceSquare = "";
var chess;
function WhichButton(event) {
    var cell = undefined;
    if (event.target.localName == "img") {
        cell = event.target.parentNode;
    }
    if (event.target.localName == "td") {
        cell = event.target;
    }
    const activeCell = document.getElementById(cell.id);
    if (event.button == 2) {
        if (!activeCell.classList.contains("pointed")) {
            activeCell.classList.add("pointed");
        }
        else if (activeCell.classList.contains("pointed")) {
            activeCell.classList.remove("pointed");
        }
    }
    else if (event.button == 0) {
        if (sourceSquare == "") {
            for (square in SQUARES) {
                document.getElementById(SQUARES[square]).classList.remove("pointed");
            }
            const moves = chess.moves();
            for (algmove in moves) {
                let move = chess.move(moves[algmove]);
                // Parse the algebraic move to get the coordinate notation
                let coordmove = move.from + move.to;
                chess.undo();
                if (coordmove.includes(activeCell.id)) {
                    document.getElementById(coordmove.replace(activeCell.id, "")).classList.add("pointed");
                    sourceSquare = activeCell.id;
                }
            }
            return;
        }
        if (activeCell.classList.contains("pointed")) {
            try {
                try {
                    if (chess.is_castle_kingside({
                        from: sourceSquare,
                        to: activeCell.id.toString()
                    })) {
						if (chess._turn == WHITE){
							document.getElementById("f1").childNodes[0].src = document.getElementById("h1").childNodes[0].src;
							document.getElementById("h1").childNodes[0].src = "./EmptySquare.gif";
						}
						else{
							document.getElementById("f8").childNodes[0].src = document.getElementById("h8").childNodes[0].src;
							document.getElementById("h8").childNodes[0].src = "./EmptySquare.gif";
						}
                    }
                    if (chess.is_castle_queenside({
                        from: sourceSquare,
                        to: activeCell.id.toString()
                    })) {
						if (chess._turn == WHITE){
							document.getElementById("d1").childNodes[0].src = document.getElementById("a1").childNodes[0].src;
							document.getElementById("h1").childNodes[0].src = "./EmptySquare.gif";
						}
						else{
							document.getElementById("d8").childNodes[0].src = document.getElementById("a8").childNodes[0].src;
							document.getElementById("h8").childNodes[0].src = "./EmptySquare.gif";
						}
                    }
					if(chess.is_promotion({
											from: sourceSquare,
											to: activeCell.id.toString(),
											promotion: 'q'}
					)) {
						activeCell.childNodes[0].src = (promotion == 'q')?"./WhitexQueen.gif":((promotion == 'n')?"./WhitexKnight.gif":((promotion == 'r')?"./WhitexRook.gif":"./WhitexBishop.gif"));
						document.getElementById(sourceSquare).childNodes[0].src = "./EmptySquare.gif";
						for (square in SQUARES) {
							document.getElementById(SQUARES[square]).classList.remove("pointed");
						}
						chess.move({
							from: sourceSquare,
							to: activeCell.id.toString(),
							promotion: 'q'
						});
						console.log(chess.ascii());
						if (chess.isCheckmate()) alert("Checkmate");
						if (chess.isDraw()) alert("Draw: 3-fold, 5-fold, 50 move rule, stalemate");
						Reconfig();
						return;
					}
                }
                catch (err) { console.log(err)}
                activeCell.childNodes[0].src = document.getElementById(sourceSquare).childNodes[0].src;
                document.getElementById(sourceSquare).childNodes[0].src = "./EmptySquare.gif";
                for (square in SQUARES) {
                    document.getElementById(SQUARES[square]).classList.remove("pointed");
                }
                chess.move({
                    from: sourceSquare,
                    to: activeCell.id.toString(),
                    promotion: 'q'
                });
            }
            catch (error) {
                console.log(error);
            }
            console.log(chess.ascii());
            sourceSquare = "";
			AIMove();
        }
        else {
            for (square in SQUARES) {
                document.getElementById(SQUARES[square]).classList.remove("pointed");
            }
            sourceSquare = "";
            for (square in SQUARES) {
                document.getElementById(SQUARES[square]).classList.remove("pointed");
            }
            const moves = chess.moves();
            for (algmove in moves) {
                let move = chess.move(moves[algmove]);
                // Parse the algebraic move to get the coordinate notation
                let coordmove = move.from + move.to;
                chess.undo();
                if (coordmove.includes(activeCell.id)) {
                    document.getElementById(coordmove.replace(activeCell.id, "")).classList.add("pointed");
                    sourceSquare = activeCell.id;
                }
            }
        }
        console.log(chess.fen().split(" ")[0]);
    }
	Reconfig();
	if (chess.isCheckmate()) alert("Checkmate");
	if (chess.isDraw()) alert("Draw: 3-fold, 5-fold, 50 move rule, stalemate");
}
// pass activeCell as the destination cell
function moveSquare(activeCell, sourceSquare, promotion){
	try {
		try {
			if (chess.is_castle_kingside({
				from: sourceSquare,
				to: activeCell.id.toString()
			})) {
				if (chess._turn == WHITE){
					document.getElementById("f1").childNodes[0].src = document.getElementById("h1").childNodes[0].src;
					document.getElementById("h1").childNodes[0].src = "./EmptySquare.gif";
				}
				else{
					document.getElementById("f8").childNodes[0].src = document.getElementById("h8").childNodes[0].src;
					document.getElementById("h8").childNodes[0].src = "./EmptySquare.gif";
				}
			}
			if (chess.is_castle_queenside({
				from: sourceSquare,
				to: activeCell.id.toString()
			})) {
				if (chess._turn == WHITE){
					document.getElementById("d1").childNodes[0].src = document.getElementById("a1").childNodes[0].src;
					document.getElementById("h1").childNodes[0].src = "./EmptySquare.gif";
				}
				else{
					document.getElementById("d8").childNodes[0].src = document.getElementById("a8").childNodes[0].src;
					document.getElementById("h8").childNodes[0].src = "./EmptySquare.gif";
				}
			}
			if(chess.is_promotion({
				from: sourceSquare,
				to: activeCell.id.toString(),
				promotion: promotion
			})) {
				activeCell.childNodes[0].src = (promotion == 'q')?"./WhitexQueen.gif":((promotion == 'n')?"./WhitexKnight.gif":((promotion == 'r')?"./WhitexRook.gif":"./WhitexBishop.gif"));
				document.getElementById(sourceSquare).childNodes[0].src = "./EmptySquare.gif";
				for (square in SQUARES) {
					document.getElementById(SQUARES[square]).classList.remove("pointed");
				}
				chess.move({
					from: sourceSquare,
					to: activeCell.id.toString(),
					promotion: promotion
				});
				console.log(chess.ascii());
				if (chess.isCheckmate()) alert("Checkmate");
				if (chess.isDraw()) alert("Draw: 3-fold, 5-fold, 50 move rule, stalemate");
				Reconfig();
				return;
			}
		}
		catch (err) { console.log(err)}
		activeCell.childNodes[0].src = document.getElementById(sourceSquare).childNodes[0].src;
		document.getElementById(sourceSquare).childNodes[0].src = "./EmptySquare.gif";
		for (square in SQUARES) {
			document.getElementById(SQUARES[square]).classList.remove("pointed");
		}
		chess.move({
			from: sourceSquare,
			to: activeCell.id.toString(),
			promotion: 'q'
		});
	}
	catch (error) {
		console.log(error);
	}
	console.log(chess.ascii());
	if (chess.isCheckmate()) alert("Checkmate");
	if (chess.isDraw()) alert("Draw: 3-fold, 5-fold, 50 move rule, stalemate");
	Reconfig();
}
function AIMove(){
	if (chess.isCheckmate()) alert("Checkmate");
	if (chess.isDraw()) alert("Draw: 3-fold, 5-fold, 50 move rule, stalemate");
	const moves = chess.moves();
	let move = chess.move(moves[Math.floor(moves.length * Math.random()-1)]);
	moveSquare(document.getElementById(move.to), move.from, move.promotion);
}
function name(type, color) {
  var name1 = "./";
  name1 += (color != "b") ? "White" : "Black";
  name1 += 'x';
  switch (type) {
    case 'n':
      name1 += "Knight";
      break;
    case 'k':
      name1 += "King";
      break;
    case 'b':
      name1 += "Bishop";
      break;
    case 'q':
      name1 += "Queen";
      break;
    case 'p':
      name1 += "Pawn";
      break;
    case 'r':
      name1 += "Rook";
      break;
  }
  name1 += ".gif";
  return name1;
}
function Reconfig() {
    for (x in chess.board()){
		for (y in chess.board()){
			if (chess.board()[x][y]!=null){
				document.getElementById(chess.board()[x][y].square).childNodes[0].src = name(chess.board()[x][y].type, chess.board()[x][y].color);
			}
			else{
				document.getElementById(algebraic(8*x+y)).childNodes[0].src = "./EmptySquare.gif";
			}
		}
    }
}

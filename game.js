var playerOneSymbol;
var playerTwoSymbol;
var player1 = "1";
var player2 = "2";
var playerOneColor = "red";
var playerTwoColor = "blue";
var currentPlayer = player1;
var won = false;
var draw = false;

$("button").click(function () {
  symbol = $("input[type='radio']:checked").val();
  localStorage.setItem("symbol", symbol);
  location.href = "board.html";
});

function setSymbols() {
  playerOneSymbol = localStorage.getItem("symbol");
  playerTwoSymbol = playerOneSymbol === "X" ? "O" : "X";
}

function rowCheck(symbol, row) {
  var hasWon = true;
  var tdrow = "." + row;
  var tdcells = $(tdrow).find("td");
  tdcells.each(function () {
    hasWon &= $(this).text() == symbol;
  });
  return hasWon;
}

function columnCheck(symbol, column) {
  var hasWon = true;
  var tdcells = $("." + column);
  tdcells.each(function () {
    hasWon &= $(this).text() == symbol;
  });
  return hasWon;
}

function rowsCheck(symbol) {
  return (
    rowCheck(symbol, "firstRow") ||
    rowCheck(symbol, "secondRow") ||
    rowCheck(symbol, "thirdRow")
  );
}

function columnsCheck(symbol) {
  return (
    columnCheck(symbol, "firstColumn") ||
    columnCheck(symbol, "secondColumn") ||
    columnCheck(symbol, "thirdColumn")
  );
}

function leftDiagonalCheck(symbol) {
  return (
    $(".firstRow .firstColumn").text() == symbol &&
    $(".secondRow .secondColumn").text() == symbol &&
    $(".thirdRow .thirdColumn").text() == symbol
  );
}

function rightDiagonalCheck(symbol) {
  return (
    $(".thirdRow .firstColumn").text() == symbol &&
    $(".secondRow .secondColumn").text() == symbol &&
    $(".firstRow .thirdColumn").text() == symbol
  );
}

function diagonalsCheck(symbol) {
  return leftDiagonalCheck(symbol) || rightDiagonalCheck(symbol);
}

function hasPlayerOneWon() {
  return (
    rowsCheck(playerOneSymbol) ||
    columnsCheck(playerOneSymbol) ||
    diagonalsCheck(playerOneSymbol)
  );
}

function hasPlayerTwoWon() {
  return (
    rowsCheck(playerTwoSymbol) ||
    columnsCheck(playerTwoSymbol) ||
    diagonalsCheck(playerTwoSymbol)
  );
}

function areAllCellsFilled() {
  var cells = $("td");
  var count = 0;
  cells.each(function () {
    if ($(this).text() != "") {
      count += 1;
    }
  });
  if (count == 9) return true;
  return false;
}

function modifyHeading(message) {
  if (typeof message === "number") {
    $("h3").html("Player " + message + " won");
  } else if (typeof message === "string") {
    $("h3").html(message);
  }
  $("h3").addClass("animated bounce infinite modifyHeadingColor");
}

function modifyBodyBackground() {
  $("body").css("background-color", "gray");
}

function makeRestartButtonVisible() {
  $(".buttonDiv").css("visibility", "visible");
  setTimeout(function () {
    $(".buttonDiv button").addClass("animated zoomIn");
  }, 2000);
}

function modifyBoardBackground() {
  $(".board").css("opacity", "0.3");
}

function makeSound(soundFile) {
  var audio = new Audio(soundFile);
  audio.play();
}

$(document).ready(function () {
  $(".winMessageDiv").hide();
});

setSymbols();

$("h3").html("Player " + currentPlayer + "'s turn");
$(".cell").click(function () {
  if ($(this).text() == "" && !won) {
    $(this).text(currentPlayer === player1 ? playerOneSymbol : playerTwoSymbol);
    makeSound("slamming_table.mp3");

    if (hasPlayerOneWon()) {
      modifyHeading(1);
      makeSound("game-win-sound-effect.mp3");
      modifyBodyBackground();
      modifyBoardBackground();
      makeRestartButtonVisible();
      won = true;
    } else if (hasPlayerTwoWon()) {
      modifyHeading(2);
      makeSound("game-win-sound-effect.mp3");
      modifyBodyBackground();
      modifyBoardBackground();
      makeRestartButtonVisible();
      won = true;
    } else if (areAllCellsFilled()) {
      modifyHeading("Draw!!");
      makeSound("game-win-sound-effect.mp3");
      modifyBodyBackground();
      modifyBoardBackground();
      makeRestartButtonVisible();
      draw = true;
    }

    if (!won && !draw) {
      currentPlayer = currentPlayer == player1 ? player2 : player1;
      $("h3").html("Player " + currentPlayer + "'s turn");
    }
  }
});

$(".buttonDiv button").click(function () {
  $("body").css("background-color", "white");
  location.href = "index.html";
});

$(".cell").hover(
  function () {
    if ($(this).text() == "" && !won) {
      $(this).addClass("makeCursor");
      var currentColor =
        currentPlayer === player1 ? playerOneColor : playerTwoColor;
      $(this).css("background-color", currentColor);
    }
  },
  function () {
    $(this).removeClass("makeCursor");
    $(this).css("background-color", $(".board").css("background-color"));
  }
);

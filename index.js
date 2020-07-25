var symbol;
$("button").click(function () {
  symbol = $("input[type='radio']:checked").val();
  console.log(symbol);
  location.href = "board.html";
});

function getFirstPlayerSymbol() {
  return symbol;
}

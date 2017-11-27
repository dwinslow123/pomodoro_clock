$(document).ready(() => {
  const buzzer = $("#buzzer")[0];
  let count = parseInt($("#num").html());
  let breakTime = parseInt($("#breakNum").html());
  $("#reset").hide();

  $("#start").on("click", () => {
    count *= 60;
    breakTime *= 60;

    let counter = setInterval(() => {
      //hides while timer is running
      $(
        "#start, #minus5Clock, #add5Clock, #minus5Break, #add5Break, #breakNum, #title1, #title2"
      ).hide();
      $("#timeType").show();
      $("#timeType").html("Session Time: ");
      count -= 1;
      if (count === 0) {
        buzzer.play();
        clearInterval(counter);

        let startBreak = setInterval(() => {
          $("#timeType").html("Break Time: ");
          $("#breakNum").show();
          $("#timeType").show();
          breakTime -= 1;
          if (breakTime === 0) {
            clearInterval(startBreak);
            buzzer.play();
            $("#reset").show();
            $("#breakNum, #timeType").hide();
            if (breakTime % 60 >= 10) {
              $("#breakNum").html(Math.floor(breakTime / 60) + ":" + breakTime % 60);
            } else {
              $("#breakNum").html(Math.floor(breakTime / 60) + ":" + "0" + breakTime % 60);
            }
          }
        }, 1000);
        $("#num").hide();
      }
      if (count % 60 >= 10) {
        $("#num").html(Math.floor(count / 60) + ":" + count % 60);
      } else {
        $("#num").html(Math.floor(count / 60) + ":" + "0" + count % 60);
      }
    }, 1000);
  });

  $("#reset").on("click", () => {
    count = 25;
    breakTime = 25;
    $("#num").html(count);
    $("#breakNum").html(breakTime);
    $(
      "#start, #minus5Clock, #add5Clock, #minus5Break, #add5Break, #breakNum, #num, #title1, #title2"
    ).show();
    $("#reset, #timeType").hide();
  });

  $("#minus5Clock").on("click", () => {
    if (count > 5) {
      count -= 5;
      $("#num").html(count);
    }
  });

  $("#add5Clock").on("click", () => {
    count += 5;
    $("#num").html(count);
  });

  $("#minus5Break").on("click", () => {
    if (breakTime > 5) {
      breakTime -= 5;
      $("#breakNum").html(breakTime);
    }
  });

  $("#add5Break").on("click", () => {
    breakTime += 5;
    $("#breakNum").html(breakTime);
  });
});

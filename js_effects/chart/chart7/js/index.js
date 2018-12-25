var myData = {
  labels : ["Mo","Di","Mi","Do","Fr","Sa","So"],
  datasets : [
    {
      fillColor : "rgba(220,220,220,.5)",
      strokeColor : "rgba(220,220,220,1)",
      pointColor : "rgba(220,220,220,1)",
      pointStrokeColor : "#fff",
      data : [65,59,90,81,56,55,40]
    },
    {
      fillColor : "rgba(90,190,90,.5)",
      strokeColor : "rgba(90,190,90,1)",
      pointColor : "rgba(90,190,90,1)",
      pointStrokeColor : "#fff",
      data : [40,48,40,40,90,27,90]
    }
  ]
}

new Chart(document.getElementById("canvas").getContext("2d")).Line(myData)

var para = document.getElementById("p1");
function convertDateFormat(inputDate) {
    // Split the input date string into day, month, and year
    var parts = inputDate.split('-');
    
    // Check if the input format is valid
    if (parts.length === 3) {
      var day = parts[0].length==1 ? '0' + parts[0] : parts[0];
      var month = parts[1];
      var year = parts[2];
      
      // Create a new date string in the desired format
      var newDate = year + month + day;
      
      return newDate;
    } else {
      // Handle invalid input format
      return "Invalid input date format";
    }
  }
  
// function formatDateWithLineBreak(dateString) {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString("en-GB", options);
//     const day = date.toLocaleDateString("en-GB", { weekday: 'long' });
//     return formattedDate + "<br>" + "(" + day + ")";
// }
function formatDateWithLineBreak(dateString) {
    const dateParts = dateString.split('-');

    if (dateParts.length !== 3) {
        return "Invalid date format";
    }

    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const formattedDate = date.toLocaleDateString("en-GB", options);
    const day = date.toLocaleDateString("en-GB", { weekday: 'long' });

    return formattedDate + "<br>" + "(" + day + ")";
}


document.getElementById("addRowButton").addEventListener("click", function() 
{
    const table = document.querySelector("table");
    const newRow = table.insertRow(table.rows.length);
    const newCell1 = newRow.insertCell(0);
    const newCell2 = newRow.insertCell(1);
    const newCell3 = newRow.insertCell(2);

    const newDate = document.getElementById("newDate").value;
    const newCode = document.getElementById("newCode").value;
    const newSubject = document.getElementById("newSubject").value;

    newCell1.innerHTML = formatDateWithLineBreak(newDate);
    newCell2.innerHTML = newCode;
    newCell3.innerHTML = newSubject;

    document.getElementById("newDate").value = "";
    document.getElementById("newCode").value = "";
    document.getElementById("newSubject").value = "";
});

function byRoll(code) 
{
    const table = document.querySelector("table");
    const newRow = table.insertRow(table.rows.length);
    const newCell1 = newRow.insertCell(0);
    const newCell2 = newRow.insertCell(1);
    const newCell3 = newRow.insertCell(2);
    const newCell4 = newRow.insertCell(3);

    const newDate = myDates[code];
    const newCode = code;
    const newSubject = myList[code];
    if (morning.includes(code)) 
        newTime = '10:00AM - 1:00PM';
    else if(morningFEC.includes(code))
        newTime = '10:00AM - 12:00PM'
    else if (evening.includes(code)) 
        newTime = '2:00PM - 5:00PM';
    else 
        newTime = 'Undefined';
    
    newCell1.innerHTML = formatDateWithLineBreak(newDate);
    newCell2.innerHTML = newCode;
    newCell3.innerHTML = newSubject;
    newCell4.innerHTML = newTime;

};


document.getElementById("addRollButton").addEventListener("click", function() {
    const table = document.getElementById('myTable');

    const tbody = table.querySelector('tbody');

    const rows = tbody.querySelectorAll('tr:not(:first-child)');

    // Remove all non-first rows from the table
    rows.forEach(function(row) {
        tbody.removeChild(row);
    });

    const newRoll = document.getElementById("newRoll").value.toUpperCase();
    para.innerHTML=`${newRoll} 's DateSheet`;
    let arr;

    if(newRoll.substring(0, 4)=="2K21" || newRoll.substring(0, 4)=="2K20" || newRoll.substring(0, 2)=="23" || newRoll.substring(0, 4)=="2K22")
    {
        arr = studentData[newRoll];
    }
    else 
    {
        alert("Enter Valid Roll No 2K20-23");
        return;
    }


    let stampArr = [];
    for(let i=0; i<arr.length; i++)
    {
        stampArr[i] = myDates[arr[i]] ? convertDateFormat(myDates[arr[i]]) : null;
    }

    console.log(arr)
    console.log(stampArr)

    const stampArrWithIndexes = stampArr.map((value, index) => ({ value, index }));

    // Sort the array of objects based on the stamp values
    stampArrWithIndexes.sort((a, b) => a.value - b.value);
    
    // Reorder the original arr based on the sorted stampArrWithIndexes
    const sortedArr = stampArrWithIndexes.map(obj => arr[obj.index]);

    console.log(sortedArr)

    for(var i=0; i<arr.length; i++)
    {
        if(myDates[sortedArr[i]])
            byRoll(sortedArr[i]);
    }

});

var crsr = document.querySelector("#cursor");
document.addEventListener("mousemove", function (dets) {
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
  });

  var btn99 = document.getElementById("btn99");
  function getPDF(){
    console.log("Hi");
    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    
    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    

    html2canvas($(".canvas_div_pdf")[0],{allowTaint:true}).then(function(canvas) {
        canvas.getContext('2d');
        
        console.log(canvas.height+"  "+canvas.width);
        
        
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
        
        
        for (var i = 1; i <= totalPDFPages; i++) { 
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        
        pdf.save("HTML-Document.pdf");
    });
};
function generatePDF() {
    const element = document.querySelector("body");
    html2pdf().from(element).save();
}
  btn99.addEventListener("click",generatePDF);

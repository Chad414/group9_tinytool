const $tableID = $('#table');
const $EXPORT = $('#export');

const newTr = `
<tr class="hide">
  <td class="pt-3-half white-text" contenteditable="true">Define Function Here</td>
  <td class="pt-3-half white-text" contenteditable="true">500</td>
  <td>
    <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
  </td>
</tr>`;

//$('.table-add').on('click', 'i', () => {
$(".add").click(function(){

    console.log("Adding new row");

    const $clone = $tableID.find('tbody tr').last().clone(false).removeClass('hide table-line');

    if ($tableID.find('tbody tr').length === 0) {

        $('tbody').append(newTr);
    }

    $tableID.find('table').append($clone);
});

$tableID.on('click', '.table-remove', function () {
    console.log("Removing row");

    $(this).parents('tr').detach();
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$(".calculate").click(function(){
    console.log("Button Pressed");

    const $rows = $tableID.find('tr:not(:hidden)');
    const headers = [];
    const data = [];

    // Get the headers (add special header logic here)
    $($rows.shift()).find('th:not(:empty)').each(function () {
        let header = $(this).text().toLowerCase();

        if (header === "estimated lines of code") {
            header = "loc";
        }

        headers.push(header);
    });

    // Turn all existing rows into a loopable array
    $rows.each(function () {
        const $td = $(this).find('td');
        const h = {};

        // Use the headers from earlier to name our hash keys
        headers.forEach((header, i) => {

            h[header] = $td.eq(i).text();
        });

        data.push(h);
    });

    let totalLOC = 0;

    for (let i = 0; i < data.length; i++) {
        let n = parseInt(data[i].loc);
        if (!Number.isInteger(n)) {
            n = 0;
        }
        totalLOC += n;
    }

    let pm = document.getElementById("person-months").value;
    let salary = document.getElementById("salary").value;
    let x = 5; 

    // Check if inputs are empty here

    let productivity = totalLOC / pm;
    let costLOC = (salary / productivity).toFixed(2);
    let totalCost = (salary * pm).toFixed(2);

    document.getElementById("result1").innerText = totalLOC.toString();
    document.getElementById("result2").innerText = "$" + costLOC.toString();
    document.getElementById("result3").innerText = "$" + totalCost.toString();
    document.getElementById("result4").innerText = productivity.toString() + " LOC/pm";
});

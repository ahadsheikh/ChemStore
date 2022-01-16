let SEARCH_PAGE_DATA_FETCHED = false
const BASE_URL = 'http://127.0.0.1:8000'
let searchData = {}             // Holding all data
let selectedChemForEdit = []    // Holding matched data


$('#addShipmentForm').on('submit', (e) => {
    e.preventDefault()
})
const checkClick = document.getElementById('listContent')
$('body').on('click', (e) => {
    if(!checkClick.contains(e.target)){
        checkClick.innerHTML = ''
    }
})

function fetchSearchData(url, resolveData) {
    fetch(BASE_URL + url)
        .then(res => {
            if (res.status === 200 && res.ok) return res.json();
            else console.log(res.error())
        })
        .then(data => {
            resolveData(data)
        })
        .catch(err => {
            console.log(err)
        })
}

function addChemical() {
    console.log("Ha")
    const template = $('#search_form').html()
    const search_o = Mustache.render(template, {p_text: 'Substance name. ex: Oxygen'})
    $('#searchTarget').html(search_o)
    fetchSearchData((data) => {
        searchData = data;
    })
    $("#searchForm").submit(function (e) {
        e.preventDefault();
    });
    $('#searchFormInput').on('input', function () {
        let promise = fuzzysort.goAsync($(this).val(), searchData, {key: 'name'})
        promise.then(results => {
            const template = $('#searchFormContent').html()
            const data = {
                chemicals: results,
                name: function () {
                    return this.obj.name;
                },
                amount: function () {
                    return this.obj.amount;
                }
            }
            const out = Mustache.render(template, data)
            $('#searchDataTarget').html(out)
        }).catch(err => console.log(err))
    })
}

function showInput(opt) {
    let url = ''
    if (opt === 0) {
        url = '/api/chemicals/'
    }
    fetchSearchData(url, (data) => {
        searchData = data;
        $('#addShipmentInput').css('display', 'block')
    })
}

// Make pop up real time search results
function showInputChange(e) {
    let promise = fuzzysort.goAsync($(e.target).val(), searchData, {key: 'name'})
    promise.then(results => {
        const template = $('#searchFormContent').html()
        const data = {
            chemicals: results,
            id: function () {
                return this.obj.id;
            },
            name: function () {
                return this.obj.name;
            },
            amount: function () {
                return this.obj.amount;
            }
        }

        const outputCon = $('#listContent').html('')

        if (results.length > 0) {
            const out = Mustache.render(template, data)
            let target = $('#addThingsChemContent')
            let offset = target.offset();
            let height = target.height();
            let top = offset.top + height + "px";
            let right = offset.left + "px";

            outputCon.html(out).css({
                'position': 'absolute',
                'width': '50em',
                'left': right,
                'top': top
            })
        }
    }).catch(err => console.log(err))
}

// Select a content to add new content
function searchItemSelection(){
    body = $("#addThingsInputBody");
}



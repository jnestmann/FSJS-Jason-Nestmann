// the following script currently only applies to the detail page even though
// the _scripts.html partial loads this to the index and add pages when building
// the templates

const trashcans = document.getElementById('delete');
const pencils = document.getElementById('edit');

if (trashcans == null) {
    console.log("homepage");
} else {
    trashcans.addEventListener('click', ()=> {
        console.log("delete");
    });

    pencils.addEventListener('click', ()=> {
        console.log('edit');
    });    
}
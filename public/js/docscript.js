// the following script currently only applies to the detail page even though
// the _scripts.html partial loads this to the index and add pages when building
// the templates

const trashcans = document.getElementById('delete');
const pencils = document.getElementById('edit');

if (trashcans == null) {
    console.log("homepage");
} else {
    trashcans.addEventListener('click', ()=> {
        let id = document.getElementById('game_id').textContent;
        deleteFileClick(id);
    });

    pencils.addEventListener('click', ()=> {
        console.log('edit');
    });    
}


function deleteFileClick(id) {
  if (confirm("Are you sure?")) {
    $.ajax({
      type: 'DELETE',
      url: '/file/' + id,
      dataType: 'json',
      contentType : 'application/json',
    })
      .done(function(response) {
        console.log("File", id, "deleted");
        //refreshFileList();
      })
      .fail(function(error) {
        console.log("Error deleting file: ", error);
      })
  }
}
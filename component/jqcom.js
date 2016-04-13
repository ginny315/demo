var state = {
	value:null
}

$('#input').on('keyup',function() {
	 state.value = $(this).val().trim();
	 render();
})

function render() {
	$('#output').html(state.value);
}

render();
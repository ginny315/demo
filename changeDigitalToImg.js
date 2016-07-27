/**
 * change digital to img
 * @return function
 * params str
 */
module.exports = function(){
	return function (num,dom){
		var arr = (num+'').split(''),
			len = arr.length,
			newInsertStr = '';
		for(var i=0 ; i<len ; i++) {
			newInsertStr += '<div class="'+ arr[i] + '"></div>';
		}
		dom.html(newInsertStr);
	}
};
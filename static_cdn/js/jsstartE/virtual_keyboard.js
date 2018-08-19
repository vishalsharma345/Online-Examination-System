var vKeyboard = {
	layout : [{"id":1,"name":"numericLayout"},{"id":2,"name":"alphaNumericLayout"}], // 0 - numeric ; 1 - alphanumeric
	numericLayout : [
		[["Backspace"]],
		[["7"], ["8"], ["9"]], 
		[["4"], ["5"], ["6"]], 
		[["1"], ["2"], ["3"]], 
		[["0"], ["."], ["-"]],
		[["&#x2190;"],["&#x2192;"]],
		[["Clear All"]]
	],
	alphaNumericLayout : [
		[
			[["1"],["2"],["3"],["4"],["5"],["6"],["7"],["8"],["9"],["0"]],
			[["q"],["w"],["e"],["r"],["t"],["y"],["u"],["i"],["o"],["p"]],
			[["a"],["s"],["d"],["f"],["g"],["h"],["j"],["k"],["l"]],
			[["z"],["x"],["c"],["v"],["b"],["n"],["m"],["."],["-"],["+"]],
			[["Space"],["Clear All"]],
			[["Backspace"],["Caps Lock"],["Shift"],["&#x2190;"],["&#x2192;"]]
		],
		[
			[["1"],["2"],["3"],["4"],["5"],["6"],["7"],["8"],["9"],["0"]],
			[["Q"],["W"],["E"],["R"],["T"],["Y"],["U"],["I"],["O"],["P"]],
			[["A"],["S"],["D"],["F"],["G"],["H"],["J"],["K"],["L"]],
			[["Z"],["X"],["C"],["V"],["B"],["N"],["M"],["."],["-"],["+"]],
			[["Space"],["Clear All"]],
			[["Backspace"],["Caps Lock"],["Shift"],["&#x2190;"],["&#x2192;"]]
		]
	],
	selectedKeyboard : '',
	saTypeQuesID:'',
	allowedChars : new Array("+","-"),
	splKeys : new Array("Caps Lock","Shift","&#x2192;","&#x2190;","Backspace","Space","Clear All"),
	capsBn : false,
	shiftBn : false,
	InsertionS : 0,
	keyProceed : true
};

function triggerKeyboard(type){
	// Numeric Keyboard
	if(type==1){
		vKeyboard.saTypeQuesID = $('input[type="text"]').attr("id");
		$('#answer').after('<div id="vKeyboard" class="vKeyboard">'+getHTMLVirtualKeyboard(type)+'</div>');
		$("#vKeyboard").width("135px");
	}
	// Alphanumeric Keyboard
/*	else if (type==2){
		$("#vKeyboard").width("350px");
	}*/
//	$("#vKeyboard").height("170px");
	bindOnClicks();
}
function triggerKeyboardGroup(type,quesId){
	// Numeric Keyboard
	if(type==1){
		vKeyboard.saTypeQuesID = "answer"+quesId;
		$('#answer'+quesId).after('<div id="vKeyboard'+quesId+'" class="vKeyboard">'+getHTMLVirtualKeyboard(type)+'</div>');
		$("#vKeyboard"+quesId).width("135px");
	}
	// Alphanumeric Keyboard
/*	else if (type==2){
		$("#vKeyboard").width("350px");
	}*/
//	$("#vKeyboard").height("170px");
	bindOnClicks();
}

function getHTMLVirtualKeyboard(type){
	var str='';
	for(var i=0;i<vKeyboard.layout.length;i++){
		if(vKeyboard.layout[i].id==type){
			vKeyboard.selectedKeyboard = vKeyboard.layout[i].id;
			str += LayoutHTML(vKeyboard.layout[i].name);
			break;
		}
	}
	return str;
}


/***************************************************Fill Layout****************************************************************/
function LayoutHTML(type){
	var str ='';
	if(type == 'numericLayout'){
		for(var i=0;i<vKeyboard.numericLayout.length;i++){
			for(var j=0;j<vKeyboard.numericLayout[i].length;j++){
				//str+='<input type="button" class="vKeyboardKeys" value="'+vKeyboard.numericLayout[i][j]+'"/>';
				for(var k=0; k<vKeyboard.splKeys.length ; k++){
					if(vKeyboard.numericLayout[i][j] == vKeyboard.splKeys[k]){
						str +='<span class="vKeyboardSplKeys"';
						if(vKeyboard.numericLayout[i][j]=='&#x2190;')
							str += ' data="left" style="font-weight:normal"';
						if(vKeyboard.numericLayout[i][j]=='&#x2192;')
							str += ' data="right" style="font-weight:normal"';
						str +=">";
						str += vKeyboard.numericLayout[i][j];
						str += "</span>";
						splKeyFlag = true;
						break;
					}
				}
				if(!splKeyFlag){
					str+='<span class="vKeyboardKeys">'+vKeyboard.numericLayout[i][j]+'</span>';
				}
				splKeyFlag = false;
			}
			str+="<br/>";
		}
	}else if (type == 'alphaNumericLayout'){
		var splKeyFlag = false;
		var shiftKeys = (vKeyboard.shiftBn || vKeyboard.capsBn)? 1:0;
		//console.log(shiftKeys);
		for(var i=0;i<vKeyboard.alphaNumericLayout[shiftKeys].length;i++){
			for(var j=0;j<vKeyboard.alphaNumericLayout[shiftKeys][i].length;j++){
				for(var k=0; k<vKeyboard.splKeys.length ; k++){
					if(vKeyboard.alphaNumericLayout[shiftKeys][i][j] == vKeyboard.splKeys[k]){
						str +='<span class="vKeyboardSplKeys';
						if(vKeyboard.alphaNumericLayout[shiftKeys][i][j]=='Space' || vKeyboard.alphaNumericLayout[shiftKeys][i][j]=='Clear All' )
							str += ' space"';
						else
							str += '"';
						if(vKeyboard.alphaNumericLayout[shiftKeys][i][j]=='&#x2190;')
							str += '" data="left"';
						if(vKeyboard.alphaNumericLayout[shiftKeys][i][j]=='&#x2192;')
							str += '" data="right"';
						str += ">";
						str += vKeyboard.alphaNumericLayout[shiftKeys][i][j];
						str +="</span>";
						splKeyFlag = true;
						break;
					}
				}
				if(!splKeyFlag){
					str+='<span class="vKeyboardKeys">'+vKeyboard.alphaNumericLayout[shiftKeys][i][j]+'</span>';
				}
				splKeyFlag = false;
			}
			str+="<br/>";
		}
		
	}

	return str;
}

function setCursorPostion(){
	$("#"+vKeyboard.saTypeQuesID).caret({
		start: vKeyboard.InsertionS,
		end: vKeyboard.InsertionS
	});
}

function validateAndFill(text){
	if(vKeyboard.selectedKeyboard == 1){
		var previousText = $("#"+vKeyboard.saTypeQuesID).val();
		if(vKeyboard.InsertionS <= previousText.length){
			var newStr = previousText.substring(0,vKeyboard.InsertionS)+text+ previousText.substring(vKeyboard.InsertionS, previousText.length);
			if(numPadValidate(newStr)){
				$("#"+vKeyboard.saTypeQuesID).val(newStr);
				vKeyboard.InsertionS++;
			}
		}else{
			if(numPadValidate(previousText+text)){
				$("#"+vKeyboard.saTypeQuesID).val($("#"+vKeyboard.saTypeQuesID).val()+text);
				vKeyboard.InsertionS = $("#"+vKeyboard.saTypeQuesID).val().length;
				//SetCaretAtEnd(document.getElementById(vKeyboard.saTypeQuesID));
			}
		}
		
	}else if(vKeyboard.selectedKeyboard == 2 ){
		var previousText = $("#"+vKeyboard.saTypeQuesID).val();
		if(vKeyboard.InsertionS <= previousText.length){
			$("#"+vKeyboard.saTypeQuesID).val(previousText.substring(0,vKeyboard.InsertionS)+text+ previousText.substring(vKeyboard.InsertionS, previousText.length));
			vKeyboard.InsertionS++;
		}
		else{
			$("#"+vKeyboard.saTypeQuesID).val($("#"+vKeyboard.saTypeQuesID).val()+text);
			vKeyboard.InsertionS = $("#"+vKeyboard.saTypeQuesID).val().length;
			//SetCaretAtEnd(document.getElementById(vKeyboard.saTypeQuesID));
		}
	}
	setCursorPostion();
}


function SetCaretAtEnd(elem) {
	var elemLen = elem.value.length;
	vKeyboard.InsertionS = $("#"+vKeyboard.saTypeQuesID).val().length;
	// For IE Only
	if (document.selection) {
		// Set focus
		elem.focus();
		// Use IE Ranges
		var oSel = document.selection.createRange();
		// Reset position to 0 & then set at end
		oSel.moveStart('character', -elemLen);
		oSel.moveStart('character', elemLen);
		oSel.moveEnd('character', 0);
		oSel.select();
	}
	else if (elem.selectionStart || elem.selectionStart == '0') {
		// Firefox/Chrome
		elem.selectionStart = elemLen;
		elem.selectionEnd = elemLen;
		elem.focus();
	} // if
} 

function bkspPressed(){
	var text = $("#"+vKeyboard.saTypeQuesID).val();
	if(vKeyboard.InsertionS >0){
		if(vKeyboard.InsertionS == text.length){
			$("#"+vKeyboard.saTypeQuesID).val(text.substring(0,text.length-1));
			setCursorPostion();
			vKeyboard.InsertionS--;
		}else{
			$("#"+vKeyboard.saTypeQuesID).val(text.slice(0,vKeyboard.InsertionS-1)+text.slice(vKeyboard.InsertionS));
			vKeyboard.InsertionS--;
			setCursorPostion();
		}
	}else{
		setCursorPostion();
	}
}

function rightPressed(){
	vKeyboard.InsertionS= ((vKeyboard.InsertionS+1)>$("#"+vKeyboard.saTypeQuesID).val().length)?0:(vKeyboard.InsertionS+1);
	setCursorPostion();
}

function leftPressed(){
	vKeyboard.InsertionS= ((vKeyboard.InsertionS-1)>-1)?(vKeyboard.InsertionS-1):($("#"+vKeyboard.saTypeQuesID).val().length);
	setCursorPostion();
}

/********************************Keyboard Validations************************************************************************/
function numPadValidate(text) {
	var proceed = true;
	for(var i=0;i<vKeyboard.allowedChars.length;i++){
		if(text.indexOf(vKeyboard.allowedChars[i])>0){
			proceed=false;
		}
		if(text.split(vKeyboard.allowedChars[i]).length>2){
			proceed = false;
		}
	}

	var saAnswerlength=text.length;
	if(saAnswerlength > 10){
		proceed=false;
	}

	if(text.indexOf('.') > -1){
		var afterDot = text.split(".");
		if(afterDot.length>2){
			proceed=false;
		}
	}
	return proceed;
}	

/**********************************Click Functions***************************************************************/
	$('.vKeyboardKeys').live('click',function() {
		vKeyboard.saTypeQuesID = $(this).parent().prev().attr('id');
		validateAndFill($(this).text());
	//	vKeyboard.InsertionS = $(this).caret().start;
	//	vKeyboard.InsertionE = $(this).caret().end;
		if(vKeyboard.shiftBn){
			vKeyboard.shiftBn = false;
			//vKeyboard.capsBn = false;
			$('#vKeyboard').html(getHTMLVirtualKeyboard('2'));
			bindOnClicks();
		}	
	});
	
		$('.vKeyboardSplKeys').live('click',function(){
		vKeyboard.saTypeQuesID = $(this).parent().prev().attr('id');
		if($(this).text() == "Caps Lock"){
			vKeyboard.capsBn = !vKeyboard.capsBn;
			if(vKeyboard.shiftBn){
				vKeyboard.shiftBn = false;
			}
			$('#vKeyboard').html(getHTMLVirtualKeyboard('2'));
			bindOnClicks();
		}else if($(this).text() == "Shift"){
			vKeyboard.shiftBn = true;
			$('#vKeyboard').html(getHTMLVirtualKeyboard('2'));
			bindOnClicks();
		}else if($(this).text() == "Space"){
			$("#"+vKeyboard.saTypeQuesID).val($("#"+vKeyboard.saTypeQuesID).val().slice(0,vKeyboard.InsertionS)+" "+$("#"+vKeyboard.saTypeQuesID).val().slice(vKeyboard.InsertionS));
			vKeyboard.InsertionS++;
			setCursorPostion();
		}else if($(this).text() == "Backspace"){
			bkspPressed();
		}else if($(this).text() == "Clear All"){
			$("#"+vKeyboard.saTypeQuesID).val('');
			vKeyboard.InsertionS =0;
		}else {
			if($(this).attr("data") == 'left'){
				leftPressed();
			}				
			if($(this).attr("data") == 'right'){
				rightPressed();
			}
			
		}
	});
function bindOnClicks(){

	$('.vKeyboardKeys').corner("round 6px");
	$("#keyboard").select( function (event) { 
		event.preventDefault();
		if(event.stopPropagation){
			event.stopPropagation();
		}else
			event.returnValue=false;
    });

	$(".vKeyboardKeys").hover(
		function () {
			$(this).addClass("vKeyboardKeysHover");
		},
		function () {
			$(this).removeClass("vKeyboardKeysHover");
		}
	);

	$('.vKeyboardSplKeys').corner("round 6px");
	
	$(".vKeyboardSplKeys").hover(
		function () {
			$(this).addClass("vKeyboardSplKeysHover");
		},
		function () {
			$(this).removeClass("vKeyboardSplKeysHover");
		}
	);
	$("#"+vKeyboard.saTypeQuesID).mousemove(function(){
		vKeyboard.InsertionS= $(this).caret().start;
		if(typeof(iOAP.secDetails[iOAP.curSection].groupAllQuestions) == "undefined" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "" || iOAP.secDetails[iOAP.curSection].groupAllQuestions == "false")
		setCursorPostion();
	}).bind('keypress',function(event) {
		if(vKeyboard.keyProceed){
			vKeyboard.keyProceed = false;
			if(vKeyboard.selectedKeyboard == 1){
				var code = (event.keyCode ? event.keyCode : event.which); 
				if((code >47 && code<58) || code==46 || code==45 ){
					validateAndFill(String.fromCharCode(code));
				}else if(code==8){
					bkspPressed();
				}else if(code==39){
					rightPressed();
				}else if(code==37){
					leftPressed();
				}
			}
			else if(vKeyboard.selectedKeyboard == 2){
				var code = (event.keyCode ? event.keyCode : event.which);
				if((code >47 && code<58) || (code> 96 && code<123 ) || (code>64 && code<91) || code==45 || code ==43 || code == 46 || code==107 || code == 32){
					validateAndFill(String.fromCharCode(code));
					//return false;
				}else if(code==8){
					bkspPressed();
				}else if(code==39){
					rightPressed();
				}else if(code==37){
					leftPressed();
				}
			}
			vKeyboard.keyProceed = true;
		}
		return false;
	});
	
}
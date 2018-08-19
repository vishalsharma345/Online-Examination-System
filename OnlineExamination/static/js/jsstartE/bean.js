var iOAP={}; // contains details of the current group

function setGroupObj(groupObj){
	this.groupObj = groupObj;
}

/*
 * var groupObj = { sections : new Array(), secDetails : new Array(), languages :
 * new Array(), viewLang : new Array(), modules :
 * ["instructionsDiv","profileDiv","QPDiv","questionCont","sectionSummaryDiv"],
 * showMarks : false, showQType : true, curSection : 1, curQues : 1,
 * defaultLang: "", secWiseTimer: 0, noOptSec : 0, maxNoOptSec : '', time: '' ,
 * minSubmitTime : '' }; // Contains the details of a Group
 */
function createNewGroupObj(){
	//this.sections = new Array();
	this.secDetails = new Array();
	this.languages = new Array();
	this.viewLang = new Array();
	this.modules = ["instructionsDiv","profileDiv","QPDiv","questionCont","sectionSummaryDiv"];
	this.showMarks = false;
	this.showQType = true;
	this.curSection = 0;
	this.curQues = 0;
	this.defaultLang = "";
	this.secWiseTimer = 0;
	this.noOptSec = 0;
	this.maxNoOptSec = 0;
	this.minTime = 0;
	this.maxTime = 0;
	this.breakTime = 0;
	this.mandatoryBreak=0;
	this.isEditable = "N";
	this.isViewable= "N";
	this.firstNonTimeBoundGrp = false;
	this.isDisabled = true;
	this.isTypingGroup = false;
	this.hasOfflineSect = false;
	this.showMarkedForReview=false;
	return this;
}

var mockLabels = {
	correctAnswerMarks : '',
	negativeMarks : '',
	viewIn : '',
	questionNo : '',
	questionType : '',
	usefulData : '',
	timeLeft : '',
	savenext : '',
	markAsAnswered : '',
	yes : '',
	no : '',
	back : '',
	reset : '',
	resetSect : '',
	submitGrp : '',
	SubmitGroupFinal :'',
	Ok : '',
	Cancel : '',
	chooseDefaultLangErr :'',
	sectionSummary :'',
	sectionSummary1 :'',
	feedbackSubmitMsgExam :'',
	feedbackSubmitMsgAssessment :'',
	submitMsg :'',
	acceptDisclaimerMessage : ''
	
	
		
	
};

var mockVar = {
	useDefaultReportFormat : true,
	candResponseUrl : '',
	mockName : '',
	loginLabel : '',
	orgId : 0,
	mockId : 0,
	attemptId : 0,
	candMasterId : 0,
	candidate_Id : 0,
	qpId : 0,
	candId : '',  // default candidate ID
	mcQName : '', // mcq questions name
	msQName : '', // msq questions name
	saQName : '', // SA questions name
	compQName : '', // comp questions name
	laQName : '', // LA questions name
	subjQName:'', // subjective questions name
	typingQName:'', // typing question name
	programingQName:'', // typing question name
	systemParameters:'',//System Parameters
	modules : ["instructionsDiv","profileDiv","QPDiv","questionCont","sectionSummaryDiv"], // Modules are various div in the question area
	groups : new Array(),
	typingGroup : new Array(),
	currentGrp : 0,
	isMarkedForReviewConsidered : '',
	time: 0 ,
	timeLeft : 0,
	isHelpContentAvailable:false,
	helpContent : new Array(),
	minSubmitTime : 0,
	activeLinkList : ['viewQPButton','viewInstructionsButton','viewProButton','finalSub','finalTypingSub'],
	totalQues : 0,
	showOptionsHorizontally : 0,
	showCalculator : '',
	displayScoreCard : 0,
	displayPercentageScore : 0,
	storeCandResponse : 0,
	ShowHint : 0,
	langName : '',
	textAreaPad : 0,
	ScratchPad : 0,
	ruler : 0,
	protractor : 0,
	zoom : 0,
	MagnifyingGlass : 0,
	languages : new Array(),
	compreLaqQues : new Array(),
	curQuesBean : new Array(),
	backupTimeInterval : 0,		//Default Backup time interval is 0 ms
	langCount : 0,
	isBreakPage: 0,
	remainingBreakTime:0,
	resumedFromBreakPage:0,
	showOptionInViewQP:0,
	mockCandidateName : '',
	resultStatus:1,
	resultMarks:1,
	resultquesLevelReport:1,
	resultQuesStatus:1,
	lockedSubmit:1,
	scribeExtraTimeConsumed:0,
	candidateExtraTimeConsumed:0,
	groupConfigArray : new Array(),
	nonTbTime:0,
	totalDurationOfAssessment : 0,
	remainingGraceTime:0,
	graceTime:0,
	submitAllCandidatesOnTime:0,
	//recordedBlobsArrayForMock : new Array()
	
}; // contains all the parameters which are common throughout the mock.

var result= {
	candidateId : '',
	mockName:'',
	useDefaultReportFormat:'',
	mockId : 0,
	orgId : 0,
	qpId : 0,
	questions : new Array(),
    secDetails : new Array(),
    groups:new Array()
};

function QuestionResultBean(quesId,quesType,langId,selectedOptIds,givenAns,marksObtained,quesStatus,GWPM,NWPM,accuracy,keyStrokesCount,restrictedErrors,wrongCharCountUnrestricted,elapsedTime){
	this.quesId = quesId;
	this.quesType = quesType;
	this.langId = langId;
	this.selectedOptIds = selectedOptIds;
	this.givenAns = givenAns;
	this.marksObtained = marksObtained;
	this.quesStatus = quesStatus;
	this.keyStrokesCount = keyStrokesCount;
	this.restrictedErrors = restrictedErrors;
	this.wrongCharCountUnrestricted = wrongCharCountUnrestricted;
	this.elapsedTime = elapsedTime;
	this.GWPM=GWPM;
	this.NWPM=NWPM;
	this.accuracy=accuracy;
}

function compreLaqQuesBean(quesId,langData,groupComprehensionLaqQuestions,jwAudioVideo,allowedProgression,noOfReplays,isControlEnable,autoplay,additionalQuesType,columnType,subquestionShuffling){
	this.quesId = quesId;
	this.langData = langData;
	this.groupComprehensionLaqQuestions = groupComprehensionLaqQuestions;
	this.jwAudioVideo = jwAudioVideo;
	this.allowedProgression = allowedProgression;
	this.noOfReplays = noOfReplays;
	this.isControlEnable = isControlEnable;
	this.autoplay = autoplay;
    this.additionalQuesType = additionalQuesType;
    this.columnType = columnType;
    this.subquestionShuffling=subquestionShuffling;
    
}
function groupAnswerBean(quesId,answer,optionId){
	this.quesId = quesId;
	this.answer = answer;
	this.optionId = optionId;
}

function questions(quesId, quesType, comprehensionId, laqId, laqParentId, correctAnswer, allottedMarks, negMarks, quesKeyPair, keyboardType, 
		typingType, answerType, isCaseSensitive, isEvaluationRequired, quesParam, quesLangBeans, options, hint, testCasePair, paragraphDisplay, 
		programmingSkeletalCode ,alphaWordLimit,storeCandResponse,displayQuestionNo,singleLineQuestionOption, allowedExtensions ,allowedSize ,allowedType ,
		typingEvalMode ,allowedProgression,noOfReplays,isControlEnable,autoplay,wordCountVisible,singleLineResponse,rows,columns,gapId,showTypingDetails,
		showErrorCount,staticText,keyboardLayout,questionGroupAll,allowBackspace,showBackspaceCount,highlightCorrectIncorrectWord,displayNegMarks,SARecordingTime,OverwritePreviousRecording){
	this.quesId = quesId;
	this.quesType = quesType;
	this.comprehensionId = comprehensionId;
	this.laqId = laqId;
	this.laqParentId = laqParentId;
	if(storeCandResponse == 0)
		this.correctAnswer = correctAnswer;
	this.allottedMarks = allottedMarks;
	this.negMarks = negMarks;
	this.quesKeyPair = quesKeyPair;
	this.keyboardType = keyboardType;
	this.typingType = typingType;
	this.answerType = answerType;
	this.alphaWordLimit=alphaWordLimit;
	this.isCaseSensitive = isCaseSensitive;
	this.programmingSkeletalCode = programmingSkeletalCode;
	this.isEvaluationRequired = isEvaluationRequired;
	this.quesParam = quesParam;
	this.quesLangBeans = quesLangBeans;
	this.options = options;
	this.hint = hint;
	this.testCasePair = testCasePair;
	this.paragraphDisplay = paragraphDisplay;
	this.typedWord = '0';
	this.maxWordLimit='';
	this.isEvaluated = false;
	this.isCorrect = false;
	this.programingStatus = '';
	this.quesAnsStatus = 'Unanswered';
	this.quesResultBean = new Array();
	this.displayQuestionNo = displayQuestionNo;
	this.singleLineQuestionOption = singleLineQuestionOption;
	this.allowedExtensions = allowedExtensions;
	this.allowedSize = allowedSize;
	this.allowedType = allowedType;
	this.typingEvalMode = typingEvalMode;
	this.timespent = 0;
	this.selectedOptIdsList = '';
	this.selectedAnswerList = '';
	this.CorrectToCorrect = 0;
	this.CorrectToIncorrect = 0;
	this.IncorrectToIncorrect = 0;
	this.IncorrectToCorrect = 0;
	this.allowedProgression = allowedProgression;
	this.noOfReplays = noOfReplays;
	this.isControlEnable = isControlEnable;
	this.autoplay = autoplay;
	this.wordCountVisible = wordCountVisible;
	this.singleLineResponse = singleLineResponse;
	this.rows = rows;
	this.columns = columns;
    this.gapId = gapId;
    this.showTypingDetails = showTypingDetails;
    this.showErrorCount = showErrorCount;
    this.staticText = staticText;
    this.keyboardLayout = keyboardLayout;  
	this.jwAudioVideo = new Array();
	this.questionGroupAll = questionGroupAll;
	this.allowBackspace=allowBackspace;
	this.showBackspaceCount=showBackspaceCount;
	this.highlightCorrectIncorrectWord=highlightCorrectIncorrectWord;
	this.displayNegMarks=displayNegMarks;
	this.SARecordingTime=SARecordingTime;
	this.OverwritePreviousRecording=OverwritePreviousRecording;
}


function secBean(secName,answered,notanswered,marked,markedAndAnswered,isOptional,secType,questions, hasOptionalQuestion,secId,difficultyLevel,diffcultyLabels,displayNumberPanel,groupAllQuestions){
	this.secId = secId;
	this.secName = secName;
	this.answered = answered;
	this.notanswered = notanswered;
	this.marked = marked;
	this.markedAndAnswered = markedAndAnswered;
	this.isOptional = isOptional;
	this.secType = secType;
	this.questions = questions;
	this.hasOptionalQuestion = hasOptionalQuestion;
	this.isSelected = false;
	this.maxOptQuesToAns = 0;
	this.curQues = 0;
	this.sectionScore = 0;
	this.attemptedQuesCount = 0;
	this.correctQuesCount = 0;
	this.incorrectQuesCount = 0;
	this.difficultyLevel = difficultyLevel;
	this.difficultyLabels = diffcultyLabels;
	this.displayNumberPanel = displayNumberPanel;
	this.groupAllQuestions = groupAllQuestions;
	this.timespent = 0;
	this.showMarkedForReview=false;
	/*this.easyQues = new quesStatusCount(0,0,0,0,0);
	this.moderateQues = new quesStatusCount(0,0,0,0,0);
	this.hardQues = new quesStatusCount(0,0,0,0,0);*/
}

function quesParams(langID,status,answer,selectedOptId){
	this.langID = langID;
	this.status = status;
	this.answer = answer;
	this.selectedOptId = selectedOptId;
	this.isMarked=0;
	this.RecordNumber = 0;
}

function optKeyBean(keyName, keyVal){
	this.keyName = keyName;
	this.keyVal = keyVal;
}

function quesKeyBean(keyName, keyVal){
	this.keyName = keyName;
	this.keyVal = keyVal;
}

function quesLangBean(langId,quesText,hint,errorRectification){
	this.langId = langId;
	this.quesText = quesText;
	this.hint= hint;
	this.errorRectification= errorRectification;
}

function optLangBean(langId,optText){
	this.langId = langId;
	this.optText = optText;
}

function languageBean(langId,languageSpecificBean){
	this.langId = langId;
	this.languageSpecificBean = languageSpecificBean;
}

function languageSpecificBean(quesText,hint,testCasePair){
	this.quesText = quesText;
	this.hint = hint;
	this.testCasePair = testCasePair;
}

function optionBean(optId,optKeyPair){
	this.optId = optId;
	this.optKeyPair = optKeyPair;
	this.optLangBean = new Array();
}
function sequenceBean(seqId,optBean){
	this.seqId = seqId;
	this.optBean = optBean;
}

function testCaseBean(testCaseInput, testCaseOutput){
	this.testCaseInput = testCaseInput;
	this.testCaseOutput = testCaseOutput;
}

function quesStatusCount(correct, incorrect, unanswered, notEvaluated, evaluated){
	this.correct = correct;
	this.incorrect = incorrect;
	this.unanswered = unanswered;
	this.notEvaluated = notEvaluated;
	this.evaluated = evaluated;
}

function instruBean(langId,content){
	this.langId = langId;
	this.content = content;
}
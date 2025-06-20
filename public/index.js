const areSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
    let dummy;
    let  nytChoiceSolution;
    let solutions;
	let response;
    let loadingFinished=false
      document.addEventListener('DOMContentLoaded', async() => {
        try{
        response = await fetch('/.netlify/functions/hello-world')
		.then(response => response.json())
        }catch{
		alert("Sorry, this isn't working right now. :(")
		document.querySelector('h1').innerHTML="Something's Wrong."
          dummy=dummyStringFunction()
        }
    let nytData=JSON.parse(((dummy || JSON.stringify(response)).replaceAll('\\', '').slice(12,-2)))
     nytChoiceSolution=nytData.ourSolution
     solutions=solve_puzzle(nytData,nytChoiceSolution)
    loadingFinished=true
      })      
let loadedDay=new Date()
let inputList=document.querySelectorAll("input")
let buttonList=document.querySelectorAll("button")
let sameButtonList=document.querySelectorAll(".normalButton")
let resultList = document.querySelectorAll(".result") 
let specialResultList = document.querySelectorAll(".specialResult") 
let selectList = document.querySelectorAll("select") 
let spanList=document.querySelectorAll(".does") 
selectList.forEach((sel,i)=>{
  sel.addEventListener("change",()=>{
    if(sel.value=="both words"){
      spanList[i].innerText="Do"
    }else{
      spanList[i].innerText="Does"
    }
  })
})
resultList.forEach((ele)=>{ele.style.opacity="0";})
sameButtonList.forEach((button,i)=>{

  button.addEventListener("click",()=>{
  if(loadingFinished&&inputList[i].value.length>0){
    buttonFunction(i)
  }
})

button.addEventListener("mousedown",()=>{
  if(loadingFinished&&inputList[i].value.length>0){
    specialResultList[i].style.opacity="0"
  }
})

})


buttonList.forEach((button,i)=>{
button.addEventListener("click",()=>{
  let dateNow=new Date();
  if(!(dateNow.getDate()==loadedDay.getDate()&&dateNow.getMonth()==loadedDay.getMonth()&&dateNow.getFullYear()==loadedDay.getFullYear())){
    alert("The helper is out of date. Please refresh the page to update the Letter Boxed data.")
    document.querySelector('h1').innerHTML="Refresh the page!"
    loadingFinished=false
  }
})
})
document.querySelector('.howMany').addEventListener("click",()=>{
  if(loadingFinished){
let total=solutions.length+1
let p=document.querySelector(".pTotal")
p.style.opacity="100%"
	if(total==1){
	p.innerHTML=`<span style='font-weight:bold;'>${total}</span> solution`
	return;
	  }
p.innerHTML=`<span style='font-weight:bold;'>${total}</span> solutions`
  }
})
document.querySelector('.lengths').addEventListener("click",()=>{
  if(loadingFinished){
let p=document.querySelector(".pLengths")
p.style.opacity="100%"
p.innerHTML=`<span style='font-weight:bold;'>In NYT Solution:</span> <br> ${nytChoiceSolution[0].length} - ${nytChoiceSolution[1].length}<br>`
p.innerHTML+=`<span style='font-weight:bold;'>In Other Solutions:</span><br>`
solutions.forEach((pair)=>{
 p.innerHTML+=` ${pair[0].length} - ${pair[1].length}<br>`
})
  }
  })
  document.querySelector('.answers').addEventListener("click",()=>{
  if(loadingFinished){
let p=document.querySelector(".pAengths")
p.style.opacity="100%"
p.innerHTML=`<span style='font-weight:bold;'>NYT Solution:</span> <br> ${nytChoiceSolution[0]} - ${nytChoiceSolution[1]}<br>`
p.innerHTML+=`<span style='font-weight:bold;'>Other Solutions:</span><br>`
solutions.forEach((pair)=>{
 p.innerHTML+=`${pair[0]} - ${pair[1]}<br>`
})
  }
})
let functionList=[
  (pair,value,i)=>{
    if(pair[0]==value||pair[1]==value){
      return true
    }
    return false
  },
(pair,value,i)=>{
  switch (selectList[i-1].value) {
    case 'one of the words':
  if(pair[0].includes(value)||pair[1].includes(value)){
      return true
    }
    return false
    case 'the first word':
    if(pair[0].includes(value)){
      return true
    }
    return false
    case 'the second word':
    if(pair[1].includes(value)||pair[1].includes(value)){
      return true
    }
    return false
    case 'both words':
    if(pair[0].includes(value)&&pair[1].includes(value)){
      return true
    }
    return false
  }
  },
  (pair,value,i)=>{
    switch (selectList[i-1].value) {
    case 'one of the words':
  if(pair[0].startsWith(value)||pair[1].startsWith(value)){
      return true
    }
    return false
    case 'the first word':
    if(pair[0].startsWith(value)){
      return true
    }
    return false
    case 'the second word':
    if(pair[1].startsWith(value)||pair[1].startsWith(value)){
      return true
    }
    return false
    case 'both words':
    if(pair[0].startsWith(value)&&pair[1].startsWith(value)){
      return true
    }
    return false
  }
  },
  (pair,value,i)=>{
  switch (selectList[i-1].value) {
    case 'one of the words':
  if(pair[0].endsWith(value)||pair[1].endsWith(value)){
      return true
    }
    return false
    case 'the first word':
    if(pair[0].endsWith(value)){
      return true
    }
    return false
    case 'the second word':
    if(pair[1].endsWith(value)||pair[1].endsWith(value)){
      return true
    }
    return false
    case 'both words':
    if(pair[0].endsWith(value)&&pair[1].endsWith(value)){
      return true
    }
    return false
  }
  },
  (pair,value,i)=>{
  if(pair[1].charAt(0)==value){
      return true
    }
    return false
  }
]

  function buttonFunction(i){
    let value=inputList[i].value.trim().toUpperCase()
    let choiceTrue=functionList[i](nytChoiceSolution,value,i)
    let totalSolutionsTrue=0;
    solutions.forEach((pair)=>{
      if(functionList[i](pair,value,i)){
        totalSolutionsTrue++
      }
    })
    let s='s'
    if(choiceTrue){
      choiceTrue="Yes"
    }else{
      choiceTrue="No"
    }
    if(totalSolutionsTrue==1){s=''}
    specialResultList[i].style.opacity="100%"
    specialResultList[i].innerHTML=`In NYT solution: 
   <span style='font-weight:bold;'> ${choiceTrue}</span><br> 
    In <span style='font-weight:bold;'>${totalSolutionsTrue}</span> other solution${s}`
    }

    function two_word_solution(word_list, chars){
    let output = []
    word_list.forEach((word)=>{
        let last = word.charAt(word.length-1)
        let matches=[];
        word_list.forEach((w)=>{
            if(w.charAt(0)== last && w!= word){
                matches.push(w)
            }
    })
        matches.forEach((m)=>{
        let pair=new Set(word+m)
        if(areSetsEqual(pair,chars)){
            output.push([word,m])
        }
    })
})
    return output
}

function solve_puzzle(todays_metadata,exclude){ 
    let chars = new Set(todays_metadata.sides.join(''))
    let wordset = todays_metadata.dictionary
    let answers = two_word_solution(wordset, chars)
    answers.forEach((ele,i)=>{
      console.log(ele,exclude)
      if(ele[0]==exclude[0]&&ele[1]==exclude[1]){
        answers.splice(i,1)
      }
    })
    return answers
    }
      //test string for debug purposes
      function dummyStringFunction(){
          return `{"message":"{\"id\":2212,\"expiration\":1734508800,\"ourSolution\":[\"GOTHIC\",\"CRACKDOWN\"],\"printDate\":\"2024-12-17\",\"sides\":[\"KGR\",\"OHC\",\"NTA\",\"WID\"],\"date\":\"December 17, 2024\",\"dictionary\":[\"INITIO\",\"ACACIA\",\"ACAI\",\"ACARA\",\"AKARA\",\"ACING\",\"ACINI\",\"ACK\",\"ACT\",\"ACTING\",\"ACTIN\",\"ACTINIC\",\"ACTION\",\"ACTIONING\",\"ACTOR\",\"ADAGIO\",\"ADO\",\"ADORING\",\"ADORN\",\"ADORNING\",\"ADROIT\",\"AGA\",\"AGAIN\",\"AGAR\",\"AGARIC\",\"AGING\",\"AGIN\",\"AGIO\",\"AGO\",\"AGOG\",\"AGOGIC\",\"AGOGO\",\"AGONIC\",\"AGORA\",\"AGOROT\",\"AGOROTH\",\"AHA\",\"AHI\",\"AIGA\",\"AINGA\",\"AIGHT\",\"AIR\",\"AIRING\",\"AIRTIGHT\",\"AIT\",\"AKIN\",\"AORTIC\",\"ARACARI\",\"ARC\",\"ARCING\",\"ARCTIC\",\"ARDOR\",\"ARIA\",\"ARIGHT\",\"ARIKI\",\"ARNICA\",\"ARONIA\",\"ARAK\",\"ART\",\"ARTHRITIC\",\"ARTIC\",\"AWAIT\",\"AWAITING\",\"AWAKING\",\"AWARD\",\"AWK\",\"AWKWARD\",\"AWN\",\"AWNING\",\"RITH\",\"GARNI\",\"CACA\",\"CACAO\",\"CACK\",\"CACKING\",\"CACTI\",\"CAD\",\"CADGING\",\"CAGING\",\"CAIRN\",\"CAKING\",\"TOWN\",\"CAR\",\"CARACARA\",\"CARD\",\"CARING\",\"CARIAD\",\"CARN\",\"CART\",\"CARTING\",\"CARTON\",\"CARTWRIGHT\",\"CAW\",\"CIAO\",\"CICADA\",\"CIG\",\"CIGAR\",\"CIRCA\",\"CITING\",\"CITHARA\",\"KITHARA\",\"CITRIC\",\"CITRIN\",\"CITRON\",\"DOWN\",\"CRACK\",\"CRAIC\",\"CRACKING\",\"CRACKDOWN\",\"CRAG\",\"CRAW\",\"CRICK\",\"CRICKING\",\"CRI\",\"CRINGING\",\"CRIT\",\"CRITIC\",\"CROAK\",\"CROAKING\",\"CRON\",\"CRONING\",\"CRONK\",\"CROTON\",\"CROW\",\"CROWN\",\"CROWNING\",\"DACITIC\",\"DAD\",\"DADA\",\"DADAGIRI\",\"DADAH\",\"DADO\",\"DAG\",\"DAH\",\"DAHI\",\"DAI\",\"DAIKON\",\"DAK\",\"DARING\",\"DARN\",\"DARNING\",\"DART\",\"DARTING\",\"DAW\",\"DAWG\",\"DAWN\",\"DAWNING\",\"NON\",\"DOING\",\"DODGING\",\"DODO\",\"DOG\",\"DOGTRACK\",\"DOGTROT\",\"DOIT\",\"DON\",\"DONG\",\"DONGING\",\"DONGA\",\"DONKO\",\"DONOR\",\"DOR\",\"DORADO\",\"DOT\",\"DOTING\",\"DOTH\",\"DOWT\",\"DOWTING\",\"DOWAK\",\"DOWNING\",\"DOWNRIGHT\",\"DOWNWARD\",\"DRACK\",\"DRAG\",\"DRAGON\",\"DRAIN\",\"DRAINING\",\"DRAW\",\"DRAWN\",\"DRAWCARD\",\"DRINK\",\"DRINKING\",\"DROIT\",\"DRONING\",\"DRONGO\",\"DROWN\",\"DROWNING\",\"ORIGO\",\"GAD\",\"GADO\",\"GAG\",\"GAGA\",\"GAGING\",\"GAH\",\"GAIN\",\"GAINING\",\"GAIT\",\"GAK\",\"GACK\",\"GAOKAO\",\"GAR\",\"GARAGING\",\"GARTH\",\"GAWK\",\"GAWKING\",\"GOT\",\"GHAGHRA\",\"GHARARA\",\"GHI\",\"GIG\",\"GIGOT\",\"GIN\",\"GING\",\"GINK\",\"GIRD\",\"GIRT\",\"GIRO\",\"GIRTH\",\"GIRTHING\",\"GIT\",\"GOING\",\"GOAD\",\"GOD\",\"GODOWN\",\"GOGO\",\"GONG\",\"GONGING\",\"GORA\",\"GORI\",\"GORDO\",\"GORING\",\"GOTH\",\"GOTHIC\",\"GOWK\",\"GOWN\",\"GOWNING\",\"GIRN\",\"GIRNING\",\"HAH\",\"HACK\",\"HACKING\",\"HADADA\",\"HADRON\",\"HADRONIC\",\"HAG\",\"HAHA\",\"HAI\",\"HAIK\",\"HAICK\",\"HAIR\",\"HAIRDO\",\"HAKA\",\"HAKARI\",\"HARAKIRI\",\"HARD\",\"HARDON\",\"HARING\",\"HART\",\"HAD\",\"HAW\",\"HAWK\",\"HAWKING\",\"HAWT\",\"HIC\",\"HICK\",\"HIGH\",\"HIGHKICKING\",\"HIGHROAD\",\"HIGHT\",\"HIKING\",\"HIKOI\",\"HIN\",\"HIND\",\"HINGING\",\"HINOKI\",\"HIRING\",\"HIT\",\"ICING\",\"ICK\",\"IKON\",\"IGNITING\",\"IGNITOR\",\"IGNITION\",\"IGNITRON\",\"IGNORING\",\"INCA\",\"INCITING\",\"INDRAWN\",\"INDRI\",\"INGOING\",\"INGOT\",\"INION\",\"INK\",\"INKING\",\"INRO\",\"INROAD\",\"TOTO\",\"INWARD\",\"ION\",\"IONIC\",\"IORA\",\"IRITIC\",\"IROKO\",\"IRON\",\"IRONING\",\"IRONIC\",\"KAHAWAI\",\"KAI\",\"KAIKAI\",\"KAINGA\",\"KAINIC\",\"KAITIAKI\",\"KAKA\",\"KAKI\",\"KAON\",\"KARA\",\"KARAHI\",\"KADAI\",\"KARAI\",\"KARAKA\",\"KARAKIA\",\"KARO\",\"KART\",\"KARTING\",\"KAWA\",\"KAWAKAWA\",\"KHAKI\",\"KHIR\",\"KHAD\",\"KIA\",\"KICK\",\"KICKING\",\"KICKDOWN\",\"KIKOI\",\"KIN\",\"KIND\",\"KING\",\"KINGING\",\"KININ\",\"KINK\",\"KINKING\",\"KINO\",\"KIT\",\"KITING\",\"KITH\",\"KNICK\",\"KNIGHT\",\"KNIGHTING\",\"KNIT\",\"KNOT\",\"KNOW\",\"KNOWN\",\"KOA\",\"KOI\",\"KOINONIA\",\"KOKAKO\",\"KOKOWAI\",\"KONGONI\",\"KORA\",\"KORAI\",\"KORI\",\"KORO\",\"KOROWAI\",\"KOTO\",\"KOWARI\",\"KOWHAI\",\"KOWTOW\",\"KWAITO\",\"NGAIO\",\"NGAWHA\",\"NGONI\",\"NIACIN\",\"NICK\",\"NICKING\",\"NIGH\",\"NIGHT\",\"NIGHTCART\",\"NIGHTGOWN\",\"NIGHTHAWK\",\"NIGIRI\",\"NIKAH\",\"NINON\",\"NIT\",\"NITRIC\",\"NITRO\",\"NOA\",\"NOAH\",\"NOD\",\"NOG\",\"NOIR\",\"NONDA\",\"NONDRINKING\",\"NONG\",\"NONI\",\"NONWORD\",\"NOR\",\"NORI\",\"NORIA\",\"NORTH\",\"NORTHING\",\"NORTHWARD\",\"NOT\",\"NOTING\",\"NOTHING\",\"NOTICING\",\"NOTION\",\"NOTITIA\",\"NOW\",\"NOWT\",\"OAK\",\"OAR\",\"OARING\",\"ODOR\",\"OGDOAD\",\"OIK\",\"OICK\",\"OINK\",\"OINKING\",\"OKA\",\"OKING\",\"ONGOING\",\"ONIGIRI\",\"ONION\",\"ONROAD\",\"ONWARD\",\"CIT\",\"ORA\",\"ORC\",\"ORCA\",\"ORCIN\",\"ORDAIN\",\"ORDAINING\",\"ORIGIN\",\"ORT\",\"OTIC\",\"OWN\",\"OWNING\",\"OWT\",\"THAI\",\"HAC\",\"RACING\",\"RACINO\",\"RACK\",\"WRACK\",\"RACKING\",\"WRACKING\",\"RAD\",\"RADAR\",\"RADON\",\"RAG\",\"RAGA\",\"RAGING\",\"RAGI\",\"RAGINI\",\"RAGWORT\",\"RAH\",\"RAHRAH\",\"RAI\",\"RAIN\",\"RAINING\",\"RAKING\",\"RAKHI\",\"RAKI\",\"RARA\",\"RARING\",\"RAW\",\"RHINO\",\"RIA\",\"RIAD\",\"RICING\",\"RICIN\",\"RICK\",\"RICKING\",\"RICRAC\",\"RIG\",\"RIGHT\",\"RIGHTING\",\"RIGHTO\",\"RIGHTWARD\",\"RIGOR\",\"RIND\",\"RING\",\"RINGING\",\"RINGIN\",\"RINK\",\"RIOT\",\"RIOTING\",\"ROAD\",\"ROADGOING\",\"ROAR\",\"ROARING\",\"ROD\",\"ROGAINING\",\"ROKO\",\"ROND\",\"RONDO\",\"RONGORONGO\",\"RONIN\",\"RORT\",\"RORTING\",\"ROT\",\"ROTI\",\"ROTOR\",\"ROTONDA\",\"ROW\",\"KWON\",\"THAR\",\"TORN\",\"THAW\",\"THIKADAR\",\"THICK\",\"THICKO\",\"THIGH\",\"THIN\",\"THING\",\"THINGO\",\"THINK\",\"THINKING\",\"THINKO\",\"THIRD\",\"THRAWN\",\"THRONING\",\"THRONG\",\"THRONGING\",\"THROW\",\"THROWN\",\"THWACK\",\"THWACKING\",\"THWART\",\"THWARTING\",\"TIARA\",\"TIC\",\"TICK\",\"TICKING\",\"TIG\",\"TIGHT\",\"TIGHTKNIT\",\"TIGHTWAD\",\"TIGNON\",\"TIGON\",\"TIK\",\"TIKA\",\"TIKI\",\"TIKIA\",\"TIN\",\"TING\",\"TINGING\",\"TINK\",\"TINKING\",\"TIRING\",\"TIRTHA\",\"TIRTH\",\"TIT\",\"TITHING\",\"TITI\",\"TOAD\",\"TOD\",\"TODO\",\"TOG\",\"TOGA\",\"TOGT\",\"TOKING\",\"TOKOTOKO\",\"TON\",\"TONDO\",\"TONING\",\"TONG\",\"TONGING\",\"TONGA\",\"TONIC\",\"TONIGHT\",\"TONK\",\"TONKING\",\"TONKA\",\"TOR\",\"TORC\",\"TORI\",\"TORIC\",\"TORO\",\"TORT\",\"TOT\",\"TOTING\",\"TOW\",\"TOWAI\",\"TOWARD\",\"TOWNWARD\",\"TRACING\",\"TRACK\",\"TRACKING\",\"TRACT\",\"TRACTION\",\"TRACTOR\",\"TRAD\",\"TRAGIC\",\"TRAGI\",\"TRAIK\",\"TRAIKING\",\"TRAIN\",\"TRAINING\",\"TRAIT\",\"TRAITOR\",\"TRA\",\"TROD\",\"TRIAC\",\"TRIAD\",\"TRIAGING\",\"TRICAR\",\"TRICK\",\"TRICKING\",\"TRIG\",\"TRIGON\",\"TRINING\",\"TRIO\",\"TRITON\",\"TROG\",\"TROGON\",\"TROIKA\",\"TRONC\",\"TROT\",\"TROTH\",\"TROW\",\"TWAIN\",\"TWO\",\"TWONK\",\"TIRO\",\"WADA\",\"WACK\",\"WACKO\",\"WHACKO\",\"WAD\",\"WAG\",\"WAGING\",\"WAGON\",\"WAH\",\"WAHWAH\",\"WAWA\",\"WAIN\",\"WAINWRIGHT\",\"WAIT\",\"WAITING\",\"WAITRON\",\"WAKA\",\"WAKING\",\"WAR\",\"WARAGI\",\"WARD\",\"WARING\",\"WARN\",\"WARNING\",\"WART\",\"WORN\",\"WHACK\",\"WHACKING\",\"WHARIKI\",\"WHIN\",\"WHINING\",\"WHINGING\",\"WHIR\",\"WHIT\",\"WHITING\",\"WOAH\",\"WON\",\"WOT\",\"WOAD\",\"WOK\",\"WONGA\",\"WONK\",\"WORD\",\"WORT\",\"WORTH\",\"WOW\",\"WRAITH\",\"WRIGHT\",\"WRING\",\"WRINGING\",\"WRIT\",\"WRITING\",\"WRITHING\",\"WRONG\",\"WRONGING\",\"WRONGDOING\",\"WROT\",\"WROTH\",\"ACTO\",\"DOGCART\",\"KIR\",\"GAI\",\"NONIONIC\",\"ROTINI\",\"CION\",\"THRO\",\"TORTONI\",\"ACACIN\",\"ACINIC\",\"ACRON\",\"ACRONIC\",\"ACTINIA\",\"ACTININ\",\"ACTINON\",\"ACTON\",\"ADAWN\",\"ADOING\",\"ADONIC\",\"ADOWN\",\"ADRAW\",\"AGNITION\",\"AGON\",\"AHIGHT\",\"AHIGH\",\"AHIND\",\"AIRT\",\"AIRTING\",\"AIRWARD\",\"AGI\",\"AKAKIA\",\"AKHARA\",\"AKOIA\",\"AWKIN\",\"ARITH\",\"ARTIAD\",\"CARTRON\",\"CITHAR\",\"CITRININ\",\"CRIN\",\"CRINING\",\"CRINK\",\"CRINKING\",\"DOGTOWN\",\"GINGA\",\"GINGING\",\"GODKIN\",\"HACKIA\",\"HACKIT\",\"HARDHACK\",\"HARTWORT\",\"IRONIA\",\"IRONWORT\",\"KAONIC\",\"KIAKI\",\"KINGWARD\",\"KINRIK\",\"KINRICK\",\"NOGAIKA\",\"NGAKA\",\"NGARARA\",\"NIND\",\"NIGHTWARD\",\"NITHING\",\"NITON\",\"NITRON\",\"NOKICK\",\"NOIA\",\"NONDO\",\"NONIC\",\"NONOIC\",\"NOI\",\"NORITIC\",\"NORWARD\",\"NOWN\",\"NONC\",\"ODA\",\"ODAH\",\"OGA\",\"OGI\",\"OGO\",\"OGOGORO\",\"OITICICA\",\"ONGAONGA\",\"ONGON\",\"ORAD\",\"ORARION\",\"ORDO\",\"ORNITHIC\",\"ORTHIC\",\"OTRIAD\",\"AWARI\",\"OWARI\",\"OWNIO\",\"RADKNIGHT\",\"RAHDAR\",\"RAHDARI\",\"RAHING\",\"RAIK\",\"RAIKING\",\"RAITH\",\"RAKIA\",\"RARIORA\",\"RAORIKI\",\"RARIKI\",\"RAWK\",\"RAWN\",\"RAIAH\",\"RAIRD\",\"RONK\",\"RHAGON\",\"RHINION\",\"RHINODON\",\"RIGHTDOING\",\"RIKWA\",\"RIN\",\"RINGARING\",\"RINKING\",\"RIK\",\"RIRORIRO\",\"ROA\",\"ROAROA\",\"ROGNON\",\"ROAK\",\"ROTO\",\"ROTON\",\"ROWK\",\"ROWN\",\"ROWTH\",\"RIO\",\"TITIR\",\"THAWT\",\"DROT\",\"TITHI\",\"THITHI\",\"TITIN\",\"TOWNO\",\"TRAG\",\"TRAGA\"],\"par\":5,\"yesterdaysSolution\":[\"AMPHIBIANS\",\"SNIFTER\"],\"yesterdaysSides\":[\"TRN\",\"EIP\",\"SBA\",\"FHM\"],\"isFree\":false,\"editor\":\"Sam Ezersky\",\"editorImage\":\"https:\\u002F\\u002Fstorage.googleapis.com\\u002Fnyt-games-prd.appspot.com\\u002Favatars\\u002Fsam-ezersky.png\"}"}`
      }
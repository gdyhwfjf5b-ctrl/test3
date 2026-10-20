/* ===== 여기만 고치면 됩니다 =====
   사진은 images 폴더에 넣고 경로를 "images/파일명.jpg" 로 적으세요.
   메시지: messages:[["in","받은 내용","오전 9:38"],["out","보낸 내용","오전 9:39"]]
   통화기록: calls:[{dir:"out",label:"휴대전화",time:"오후 2:00"}]  (dir: out=발신, in=수신) */
/* 통화기록: K("out|in","휴대전화|부재중 전화|끊긴 전화|스팸 의심","2026-10-18 14:00",type)  type: missed=부재중(빨간색), spam=스팸 */
const K=(dir,label,at,type="")=>({dir,label,at,type});
/* ===== 캘린더 일정 생성 (파란줄=blue, 빨간줄=red) ===== */
function EVENTS(){
 const E=[],p2=n=>String(n).padStart(2,"0"),add=(y,m,d,title,color="blue",time="")=>E.push({date:`${y}-${p2(m)}-${p2(d)}`,title,color,time});
 const Y=[2025,2026,2027,2028];
 // 매달 1일·말일 부모님 연락
 Y.forEach(y=>{for(let m=1;m<=12;m++){add(y,m,1,"부모님 연락");add(y,m,new Date(y,m,0).getDate(),"부모님 연락")}});
 // 생일 (매년)
 [[12,6,"위도윤 생일"],[1,16,"윤현성 생일"],[4,9,"호수 생일"],[7,12,"최도진 생일"],[7,18,"허광열 생일"],[8,17,"강태구 생일"],[9,11,"박세환 대장님 생신"],[10,10,"남궁지원 생일"],[11,3,"강예린 생일"],[2,23,"강혁 생일"],[5,29,"김우진 생일"],[12,15,"한유현 생일"],[12,5,"김영진 반장 생일"]]
  .forEach(([m,d,t])=>Y.forEach(y=>add(y,m,d,t)));
 // 휴가 12/14~12/21 (빨강)
 for(let d=14;d<=21;d++)add(2026,12,d,"휴가","red");
 // 회식 (빨강)
 add(2026,10,16,"회식","red","오후 7:00");add(2026,11,30,"회식","red","오후 7:00");add(2027,1,5,"회식","red","오후 7:00");
 // 약속: 한 달에 두 번쯤, 날짜는 고정된 랜덤값
 let r=20261019;const rnd=()=>(r=(r*1664525+1013904223)%4294967296)/4294967296,taken=new Set(E.map(e=>e.date)),T=["오후 12:30","오후 3:00","오후 4:30","오후 6:00","오후 7:30"];
 Y.forEach(y=>{for(let m=1;m<=12;m++){let n=0,g=0;while(n<2&&g++<50){const d=2+Math.floor(rnd()*26),k=`${y}-${p2(m)}-${p2(d)}`;if(taken.has(k))continue;taken.add(k);add(y,m,d,"약속","blue",T[Math.floor(rnd()*T.length)]);n++}}});
 return E;
}
const C=(id,name,o={})=>({id,name,number:"",photo:"",favorite:false,calls:[],messages:[],...o});
const DATA={
passcode:"0707",
photoCount:2177,   // 사진 앱 "보관함" 상단에 뜨는 장수
me:{name:"서이건",photo:"",appleId:"Apple ID"},
cameraImage:"",
photos:[
 {src:"images/1.jpg",date:"2026-10-12"},
 {src:"images/2.jpg",date:"2026-10-13"},
 {src:"images/3.jpg",date:"2026-10-14"},
 {src:"images/4.jpg",date:"2026-10-15"},
 {src:"images/5.jpg",date:"2026-10-16"},
 {src:"images/6.jpg",date:"2026-10-17"},
 {src:"images/7.jpg",date:"2026-10-18"},
 {src:"images/8.jpg",date:"2026-10-19"},
 // 위 형식으로 계속 추가 (맨 아래가 가장 최근 사진)
],
contacts:[
 C("mom","어머니",{favorite:true,thread:true,unread:true,calls:[K("in","부재중 전화","2026-10-18 21:05","missed"),K("in","부재중 전화","2026-10-18 20:58","missed"),K("out","휴대전화","2026-10-09 19:20")],
  messages:[["out","오늘 늦을 것 같아요","어제"],["in","밥은 먹고 다녀","어제"]]}),
 C("dad","아버지",{favorite:true,thread:true,calls:[K("in","휴대전화","2026-10-19 08:12"),K("out","휴대전화","2026-10-12 10:05")],
  messages:[["in","주말에 시간 되냐","수요일"],["out","네 괜찮아요","수요일"]]}),
 C("poop","똥",{thread:true,calls:[K("in","부재중 전화","2026-10-15 12:08","missed")],
  messages:[["in","야 ㅋㅋㅋ","10/14/26"],["out","ㅇㅇ","10/14/26"]]}),
 C("c1","위도윤",{thread:true,calls:[K("out","휴대전화","2026-10-17 16:25")],
  messages:[["out","내일 몇 시에 봄?","10/17/26"],["in","6시쯤","10/17/26"]]}),
 C("c2","윤현성",{thread:true,messages:[["in","ㅇㅋ","10/13/26"]]}),
 C("c3","강태공",{thread:true,calls:[K("out","휴대전화","2026-10-18 18:30"),K("in","부재중 전화","2026-10-13 18:22","missed")],
  messages:[["in","이따 연락할게","어제"]]}),
 C("c4","호수",{thread:true,calls:[K("in","휴대전화","2026-10-18 14:00")],
  messages:[["out","도착했어","10/11/26"],["in","굿","10/11/26"]]}),
 C("c5","강예린"),C("c6","허광열"),C("c7","최도진"),C("c8","남궁지원"),C("c9","박찬일"),
 C("c10","강혁",{thread:true,calls:[K("in","부재중 전화","2026-10-17 19:03","missed")],
  messages:[["in","전화 좀 받아라","10/17/26"]]}),
 C("c11","김우진",{thread:true,unread:true,calls:[K("out","끊긴 전화","2026-10-17 22:41")],
  messages:[["in","자냐?","10/17/26"]]}),
 C("c12","한유현",{thread:true,calls:[K("out","휴대전화","2026-10-14 20:14")],
  messages:[["out","확인했어","10/14/26"]]}),
 C("c13","유서빈 지휘 팀장님"),C("c14","김영진 반장"),C("c15","김성태 반장"),C("c16","양응윤 반장"),
 C("c17","2팀 조태진 팀장님",{thread:true,calls:[K("in","휴대전화","2026-10-16 09:50")],
  messages:[["in","내일 일정 공유드립니다","10/16/26"],["out","확인했습니다","10/16/26"]]}),
 C("c18","김익권 형님",{thread:true,calls:[K("out","휴대전화","2026-10-15 17:36")],
  messages:[["out","형님 감사합니다","10/15/26"]]}),
 C("c19","박세환 대장님",{thread:true,calls:[K("in","부재중 전화","2026-10-16 13:12","missed"),K("out","휴대전화","2026-10-11 21:30")],
  messages:[["in","내일 08시까지 집합","10/16/26"],["out","알겠습니다","10/16/26"]]}),
 /* 스팸 번호 (연락처 목록·메시지에는 안 보이고 최근 통화에만 나옴) */
 C("s1","070-8650-2314",{spam:true,number:"070-8650-2314",calls:[K("in","스팸 의심","2026-10-19 07:40","spam")]}),
 C("s2","050-7120-4467",{spam:true,number:"050-7120-4467",calls:[K("in","스팸 의심","2026-10-18 11:17","spam")]}),
 C("s3","02-3141-9086",{spam:true,number:"02-3141-9086",calls:[K("in","스팸 의심","2026-10-14 15:47","spam")]})
],
/* 메시지 목록 순서 (위가 최근). 안 적은 대화는 뒤에 붙습니다 */
threads:["mom","c3","c11","c10","c1","c17","c19","c18","c12","poop","dad","c4","c2"],
events:EVENTS(),   // 아래 EVENTS 함수에서 만듭니다. 직접 추가하려면 EVENTS() 끝에 {date:"2026-12-25",title:"제목",time:"오후 4:30",color:"blue"} 형식으로 넣으세요 (color: blue/red)
notes:[
 {text:"살 것\n커피, 충전 케이블",date:"10/18/26",pinned:true},
 {text:"메모\n내용을 여기에",date:"10/17/26"},
 {text:"비밀 메모",date:"6/17/26",locked:true}
],
alarms:["8:00","8:10","8:20","8:30","8:40","8:50"].map(t=>({time:t,ap:"오전",label:"알람",on:true})),
worldClock:[{city:"서울",tz:"Asia/Seoul"},{city:"미국",tz:"America/New_York"}],
weather:[
 {name:"작도시",temp:18,cond:"흐림",hi:23,lo:17,bg:"linear-gradient(#3a3f4c,#1b1f2b)",note:"오전 6시경 비가 예상됩니다. 돌풍은 최대 24mph입니다.",
  hourly:[["지금","☁️",18],["오후 9시","☁️",18],["오후 10시","⛅",19],["오후 11시","⛅",18],["오전 12시","⛅",17],["오전 1시","⛅",17],["오전 2시","⛅",17]],
  daily:[["오늘","⛅",17,23],["월","🌧",16,24],["화","☀️",12,25],["수","☀️",13,26],["목","☀️",13,25]]}
],
notices:[]   // 알림센터(왼쪽 위에서 당기기)에 뜰 알림. 예: {app:"메시지",title:"어머니",body:"밥 먹었니",time:"방금",chat:"mom"}
};

(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){},70:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),c=n(31),r=n.n(c),o=(n(38),n(17)),i=n(3),l=n(4),h=n(6),d=n(5),u=(n(39),n(10)),b=n(2),j=n.n(b),p=function(e,t){return console.log("signup in client was called"),j.a.post("/api/auth/signup",{username:e,password:t}).then((function(e){return e.data})).catch((function(e){return e.response.data}))},m=function(e,t){return console.log("login was called"),j.a.post("/api/auth/login",{username:e,password:t}).then((function(e){return console.log("response: ",e.data),e.data})).catch((function(e){return console.log(e),e.response.data}))},f=n(0),x=function(e){j.a.delete("/api/auth/logout").then((function(e){return e.data})).catch((function(e){return e.response.data})).then((function(){e.setUser(null)}))};function g(e){return Object(f.jsx)("div",{className:"navbar navbar-dark bg-primary mb-3",children:Object(f.jsx)("div",{className:"container-fluid",children:e.user?Object(f.jsxs)("div",{style:{width:"100%"},className:"nav-item d-flex flex-row justify-content-between",children:[Object(f.jsx)(u.b,{className:"navbar-text",style:{color:"white",textDecoration:"none"},to:"/",children:"Home"}),Object(f.jsx)("h1",{className:"navbar-brand",style:{height:"1vh"},children:"Yolo Trader"}),Object(f.jsx)(u.b,{className:"navbar-text",style:{color:"white",textDecoration:"none"},to:"/",onClick:function(){return x(e)},children:"Logout"})]}):Object(f.jsxs)("div",{children:[Object(f.jsx)(u.b,{to:"/signup",children:"Signup"}),Object(f.jsx)(u.b,{to:"/login",children:"Login"})]})})})}function v(e){var t=e.tickers?e.tickers.map((function(e,t){return Object(f.jsxs)("div",{children:[Object(f.jsx)(u.b,{to:"/symbols/".concat(e["1. symbol"]),children:Object(f.jsx)("p",{children:e["1. symbol"]})}),Object(f.jsx)("p",{style:{color:"grey"},children:e["2. name"]})]},t)})):[];return Object(f.jsx)("div",{className:"ml-4 border border-5",style:{position:"absolute",zIndex:"2",backgroundColor:"white"},children:e.tickers&&0!==e.tickers.length?Object(f.jsx)(f.Fragment,{children:t}):Object(f.jsx)(f.Fragment,{})})}var O=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={query:"",tickers:[]},e.handleSearch=function(t){var n=t.target.value;e.setState({query:n}),j.a.get("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=".concat(n,"&apikey=").concat("6LPZ4I5S75S862T5")).then((function(t){e.setState({tickers:t.data.bestMatches})})).catch((function(e){console.log(e)}))},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(f.jsx)("div",{children:Object(f.jsx)("form",{style:{width:"100%",marginBottom:"50px"},autoComplete:"off",children:Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{className:"ml-3",htmlFor:"search"}),Object(f.jsx)("input",{className:"form-control",style:{width:"90%",height:"25px",marginLeft:"20px"},type:"text",name:"search",id:"search",value:this.state.query,placeholder:"Search by Symbol",onChange:this.handleSearch}),Object(f.jsx)(v,{tickers:this.state.tickers})]})})})}}]),n}(a.a.Component),y=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"formatCash",value:function(e){return e<1e3?e:e>=1e3&&e<1e6?+(e/1e3).toFixed(1)+"K":e>=1e6&&e<1e9?+(e/1e6).toFixed(1)+"M":e>=1e9&&e<1e12?+(e/1e9).toFixed(1)+"B":e>=1e12?+(e/1e12).toFixed(1)+"T":void 0}},{key:"render",value:function(){var e=this,t=this.props.portfolio&&0!==this.props.portfolio.length?this.props.portfolio.map((function(t,n){var s=(t.count*e.props.symbolsPrice[t.ticker]).toFixed(2),a=e.formatCash(s),c=(s-t.count*t.averagePrice).toFixed(2),r=Math.abs(c),o=((s-t.count*t.averagePrice)/(t.count*t.averagePrice)*100).toFixed(2);return Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{scope:"row",children:t.ticker}),Object(f.jsx)("td",{children:t.count}),Object(f.jsx)("td",{children:e.props.symbolsPrice[t.ticker]}),Object(f.jsx)("td",{children:a}),Object(f.jsxs)("td",{style:o<0?{color:"red"}:{color:"green"},children:[o,"%"]}),Object(f.jsxs)("td",{style:c<0?{color:"red"}:{color:"green"},children:[c>0?"+":"-",r]})]},n)})):[];return Object(f.jsxs)("div",{style:{width:"45vw",height:"35vh"},className:"ml-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded",children:[Object(f.jsx)("h4",{className:"ml-3",style:{width:"40vw",position:"relative",zIndex:"1"},children:"Portfolio"}),Object(f.jsxs)("table",{style:{width:"40vw",position:"relative",textAlign:"center"},className:"table table-hover table-sm ml-3 ",children:[Object(f.jsx)("thead",{children:Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{scope:"col",children:"Symbol"}),Object(f.jsx)("th",{scope:"col",children:"Position"}),Object(f.jsx)("th",{scope:"col",children:"Last Price"}),Object(f.jsx)("th",{scope:"col",children:"Market Value($)"}),Object(f.jsx)("th",{scope:"col",children:"Gain/Loss %"}),Object(f.jsx)("th",{scope:"col",children:"Total Change"})]})}),Object(f.jsx)("tbody",{children:t})]})]})}}]),n}(s.Component),w=n(18),k=n.n(w),C=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,c=new Array(s),r=0;r<s;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).chartRef=a.a.createRef(),e.state={myChartRef:void 0},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.setState({myChartRef:this.chartRef.current.getContext("2d")})}},{key:"render",value:function(){var e=this;if(this.state.myChartRef&&this.props.symbolsPrice&&0!==this.props.portfolio.length){var t=Object.keys(this.props.symbolsPrice),n=this.props.portfolio.map((function(t){return t.count*e.props.symbolsPrice[t.ticker]})),s=n.reduce((function(e,t){return e+t}),0),a=n.map((function(e){return(e/s*100).toFixed(2)})),c=this.props.portfolio.map((function(e){return"rgb("+Math.floor(200*Math.random())+", "+Math.floor(200*Math.random())+", "+Math.floor(200*Math.random())+")"}));this.state.myChart=new k.a(this.state.myChartRef,{type:"pie",data:{datasets:[{data:a,backgroundColor:c}],labels:t},options:{responsive:!0,maintainAspectRatio:!1}})}return Object(f.jsxs)("div",{style:{width:"45vw",height:"35vh"},className:"ml-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded",children:[Object(f.jsx)("h4",{children:"Portfolio Distribution %"}),Object(f.jsx)("div",{children:Object(f.jsx)("canvas",{style:{width:"40vw",height:"23vh"},id:"myChart",ref:this.chartRef})})]})}}]),n}(s.Component),N=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={mostactive:[]},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;j.a.get("https://".concat("sandbox",".iexapis.com/stable/stock/market/list/mostactive?listLimit=3&token=").concat("Tpk_5e0eaa8b48394791b2acc2314b207df0")).then((function(t){e.setState({mostactive:t.data})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){if(0===this.state.mostactive.length)return Object(f.jsx)("div",{style:{height:"35vh"},class:"d-flex justify-content-center align-items-center",children:Object(f.jsx)("div",{class:"spinner-border text-info",role:"status",children:Object(f.jsx)("span",{class:"sr-only",children:"Loading..."})})});var e=this.state.mostactive.map((function(e,t){return Object(f.jsxs)("div",{className:"d-flex flex-row justify-content-between alig-self-start ml-3 mr-3 pl-3 pr-3 pb-0 pt-0",children:[Object(f.jsxs)("div",{className:"d-flex flex-column justify-content-start align-self-center",children:[Object(f.jsx)("p",{className:"mb-0",children:Object(f.jsx)("strong",{children:e.symbol})}),Object(f.jsx)("p",{style:{color:"grey"},children:e.companyName})]}),Object(f.jsxs)("div",{className:"d-flex flex-column justify-content-start align-self-center",children:[Object(f.jsxs)("p",{className:"mb-0",children:["$",e.latestPrice]}),Object(f.jsxs)("p",{style:e.changePercent<0?{color:"red"}:{color:"green"},children:[e.changePercent>0?"+":"-",Math.abs(e.changePercent.toFixed(2)),"%"]})]})]},t)}));return Object(f.jsxs)("div",{style:{width:"45vw",height:"35vh"},className:"ml-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded",children:[Object(f.jsx)("h4",{className:"ml-3 mb-4",children:"Most Active"}),Object(f.jsx)("div",{className:"mb-0 pt-0 pb-0",children:e})]})}}]),n}(s.Component),P=function(e,t,n,s,a){return"buy"===n?j.a.get("/api/".concat(s,"/balance")).then((function(n){var c=n.data;if(c<e*t)return JSON.parse('{"message": "Order exceeds balance"}');var r=c-e*t;return j.a.post("/api/".concat(s,"/balance"),{balance:r}).then((function(n){return j.a.get("/api/".concat(s,"/position/").concat(a)).then((function(n){if(0===n.data.length)return j.a.post("/api/".concat(s,"/position/open/").concat(a),{count:t,averagePrice:e}).then((function(e){return e.data}));console.log(n.data[0].count);var c=(n.data[0].count*n.data[0].averagePrice+e*t)/(n.data[0].count+t),r=n.data[0].count+t;return j.a.post("/api/".concat(s,"/position/update/").concat(a),{count:r,averagePrice:c}).then((function(e){return e.data}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)})):j.a.get("/api/".concat(s,"/position/").concat(a)).then((function(n){return 0===n.data.length?JSON.parse('{"message": "No open positions in this stock."}'):n.data[0].count<t?JSON.parse('{"message": "Your current position is not enough for this order."}'):j.a.get("/api/".concat(s,"/balance")).then((function(c){var r=c.data;if(n.data[0].count===t){var o=r+e*t;return j.a.post("/api/".concat(s,"/balance"),{balance:o}).then((function(e){return j.a.post("/api/".concat(s,"/position/close/").concat(a)).then((function(e){return e.data})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}var i=n.data[0].count-t;console.log(r);var l=r+e*t;return j.a.post("/api/".concat(s,"/balance"),{balance:l}).then((function(e){return j.a.post("/api/".concat(s,"/position/update/").concat(a),{count:i,averagePrice:n.data[0].averagePrice}).then((function(e){return e.data})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))},S=function(e){return j.a.get("/api/".concat(e,"/portfolio")).then((function(e){return e.data})).catch((function(e){console.log(e)}))},F=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={news:[]},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.props.user&&S(this.props.user._id).then((function(t){var n=t.map((function(e){return e.ticker})),s=n[Math.floor(Math.random()*n.length)];j.a.get("https://finnhub.io/api/v1/company-news?symbol=".concat(s,"&from=2021-03-08&to=2021-03-09&token=c0uhttn48v6r6g5764c0"),{json:!0}).then((function(t){e.setState({news:t.data.slice(0,2)})})).catch((function(e){console.log("Error while fetching the news from API",e)}))})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){if(0===this.state.news.length)return Object(f.jsx)("div",{style:{height:"35vh"},class:"d-flex justify-content-center align-items-center",children:Object(f.jsx)("div",{class:"spinner-border text-info",role:"status",children:Object(f.jsx)("span",{class:"sr-only",children:"Loading..."})})});var e=this.state.news.map((function(e,t){return Object(f.jsx)("div",{children:Object(f.jsxs)("div",{style:{Width:"30vw"},className:"d-flex flex-row justify-content-start",children:[Object(f.jsx)("img",{style:{height:"8vh",width:"8vw"},className:" mr-2",src:e.image,alt:""}),Object(f.jsxs)("div",{className:"d-flex flex-column justify-content-center align-self-center",children:[Object(f.jsx)("a",{href:e.url,target:"_blank",rel:"noreferrer",children:Object(f.jsx)("h5",{children:e.headline})}),Object(f.jsx)("span",{style:{whiteSpace:"nowrap",textOverflow:"ellipsis",width:"15vw",height:"8vh",display:"block",overflow:"hidden"},children:e.summary})]})]})},t)}));return Object(f.jsxs)("div",{style:{width:"45vw",height:"35vh"},className:"ml-3 border p-3 border-primary shadow p-3 mb-5 bg-body rounded",children:[Object(f.jsx)("h4",{className:"mb-3",children:"Portfolio News"}),Object(f.jsx)("div",{children:e})]})}}]),n}(s.Component),M=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={portfolio:[],symbolsPrice:{},balance:0},e}return Object(l.a)(n,[{key:"formatCash",value:function(e){return e<1e3?e:e>=1e3&&e<1e6?+(e/1e3).toFixed(1)+"K":e>=1e6&&e<1e9?+(e/1e6).toFixed(1)+"M":e>=1e9&&e<1e12?+(e/1e9).toFixed(1)+"B":e>=1e12?+(e/1e12).toFixed(1)+"T":void 0}},{key:"componentDidMount",value:function(){var e,t=this;this.props.user&&(S(this.props.user._id).then((function(e){var n=e.map((function(e){return e.ticker}));j.a.get("https://".concat("sandbox",".iexapis.com/stable/stock/market/batch?symbols=").concat(n.join(","),"&types=quote&filter=latestPrice&token=").concat("Tpk_5e0eaa8b48394791b2acc2314b207df0")).then((function(e){var n={};for(var s in e.data)n[s]=e.data[s].quote.latestPrice.toFixed(2);t.setState({symbolsPrice:n})})).catch((function(e){console.log(e)})),t.setState({portfolio:e})})).catch((function(e){console.log(e)})),(e=this.props.user._id,j.a.get("/api/".concat(e,"/balance")).then((function(e){return e.data})).catch((function(e){console.lof(e)}))).then((function(e){t.setState({balance:e})})).catch((function(e){console.log(e)})))}},{key:"render",value:function(){var e=this.formatCash(this.state.balance);return Object(f.jsx)("div",{className:"container-fluid",children:this.props.user?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("div",{className:"row",children:Object(f.jsxs)("div",{className:"col",children:[Object(f.jsxs)("div",{className:"d-flex flex-row justify-content-between align-items-center ml-1 mr-2",children:[Object(f.jsxs)("h3",{className:"ml-3",children:["Welcome ",this.props.user.username]}),Object(f.jsxs)("h4",{children:["Balance: $",e]})]}),Object(f.jsx)(O,{user:this.props.user})]})}),Object(f.jsxs)("div",{className:"row",children:[Object(f.jsx)("div",{className:"col",children:Object(f.jsx)(y,{user:this.props.user,portfolio:this.state.portfolio,symbolsPrice:this.state.symbolsPrice})}),Object(f.jsx)("div",{className:"col",children:Object(f.jsx)(N,{})})]}),Object(f.jsxs)("div",{className:"row",children:[Object(f.jsx)("div",{className:"col",children:Object(f.jsx)(C,{user:this.props.user,portfolio:this.state.portfolio,symbolsPrice:this.state.symbolsPrice})}),Object(f.jsx)("div",{className:"col",children:Object(f.jsx)(F,{user:this.props.user})})]})]}):Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("li",{children:Object(f.jsx)(u.b,{to:"/signup",children:"Signup"})}),Object(f.jsx)("li",{children:Object(f.jsx)(u.b,{to:"/login",children:"Login"})})]})})}}]),n}(s.Component),R=n(14),T=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={username:"",password:"",message:""},e.handleChange=function(t){var n=t.target,s=n.name,a=n.value;e.setState(Object(R.a)({},s,a))},e.handleSubmit=function(t){t.preventDefault();var n=e.state,s=n.username,a=n.password;p(s,a).then((function(t){t.message?e.setState({message:t.message,username:"",password:""}):(console.log(t),e.props.setUser(t),e.props.history.push("/"))}))},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Signup"}),Object(f.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(f.jsx)("label",{htmlFor:"username",children:"Username: "}),Object(f.jsx)("input",{type:"text",name:"username",value:this.state.username,onChange:this.handleChange,id:"username"}),Object(f.jsx)("label",{htmlFor:"password",children:"Password: "}),Object(f.jsx)("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleChange,id:"password"}),Object(f.jsx)("button",{type:"submit",children:"Sign Up"}),this.state.message&&Object(f.jsx)("h3",{children:this.state.message})]})]})}}]),n}(s.Component),L=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={username:"",password:"",message:""},e.handleChange=function(t){var n=t.target,s=n.name,a=n.value;e.setState(Object(R.a)({},s,a))},e.handleSubmit=function(t){t.preventDefault();var n=e.state,s=n.username,a=n.password;m(s,a).then((function(t){t.message?e.setState({message:t.message,username:"",password:""}):(console.log(t),e.props.setUser(t),e.props.history.push("/"))}))},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Login"}),Object(f.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(f.jsx)("label",{htmlFor:"username",children:"Username: "}),Object(f.jsx)("input",{type:"text",name:"username",value:this.state.username,onChange:this.handleChange,id:"username"}),Object(f.jsx)("label",{htmlFor:"password",children:"Password: "}),Object(f.jsx)("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleChange,id:"password"}),Object(f.jsx)("button",{type:"submit",children:"Log in"}),this.state.message&&Object(f.jsx)("h3",{children:this.state.message})]})]})}}]),n}(s.Component),A=n(33),D=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={news:[]},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.ticker;j.a.get("https://finnhub.io/api/v1/company-news?symbol=".concat(t,"&from=2021-03-08&to=2021-03-09&token=c0uhttn48v6r6g5764c0"),{json:!0}).then((function(t){e.setState({news:t.data.slice(0,3)})})).catch((function(e){console.log("Error while fetching the news from API",e)}))}},{key:"render",value:function(){if(this.props.flag){if(0===this.state.news.length)return Object(f.jsx)("div",{style:{height:"30vh"},class:"d-flex justify-content-center align-items-center",children:Object(f.jsx)("div",{class:"spinner-border text-info",role:"status",children:Object(f.jsx)("span",{class:"sr-only",children:"Loading..."})})});var e=this.state.news.map((function(e,t){return Object(f.jsx)("div",{className:"mt-3 mb-3",children:Object(f.jsxs)("div",{style:{width:"30vw"},className:"d-flex flex-row justify-content-start",children:[Object(f.jsx)("img",{style:{height:"8vh",width:"8vw"},className:"ml-5 mr-2",src:e.image,alt:""}),Object(f.jsxs)("div",{className:"d-flex flex-column justify-content-center align-self-center",children:[Object(f.jsx)("a",{href:e.url,target:"_blank",rel:"noreferrer",children:Object(f.jsx)("h5",{children:e.headline})}),Object(f.jsx)("span",{style:{whiteSpace:"nowrap",textOverflow:"ellipsis",width:"15vw",height:"8vh",display:"block",overflow:"hidden"},children:e.summary})]})]})},t)}));return Object(f.jsxs)("div",{children:[Object(f.jsx)("h3",{className:"ml-5 mt-3",children:"News"}),Object(f.jsx)("div",{children:e})]})}return Object(f.jsx)(f.Fragment,{})}}]),n}(s.Component),U=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={limit:void 0,number:void 0,message:""},e.handleFormInput=function(t){var n=t.target.name,s=Number(t.target.value);e.setState((function(e,t){return Object(R.a)({},n,s)}))},e.handleOrder=function(t){t.preventDefault();var n=e.state,s=n.limit,a=n.number;console.log("An order is placed!"),console.log(s,a,e.props.orderType),P(s,a,e.props.orderType,e.props.user._id,e.props.ticker).then((function(t){var n=t.message;e.setState({message:n,limit:"",number:""})})).catch((function(e){console.log(e)}))},e.closeMenue=function(t){e.props.callback()},e}return Object(l.a)(n,[{key:"render",value:function(){return this.props.flag?Object(f.jsxs)("div",{style:{width:"25vw"},className:"ml-5 mr-5 mt-3 border p-3 border-primary shadow mb-5 bg-body rounded",children:[Object(f.jsxs)("div",{className:"d-flex flex-row justify-content-between align-items-start",children:[Object(f.jsx)("h3",{className:"mt-3 mb-4",children:"Place an order"}),Object(f.jsx)("button",{type:"button",onClick:this.closeMenue,className:"btn-close mt-3","aria-label":"Close",children:"X"})]}),Object(f.jsxs)("form",{onSubmit:this.handleOrder,style:{width:"100%",marginBottom:"50px"},children:[Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"limit",children:"Limit"}),Object(f.jsx)("input",{className:"form-control",style:{width:"90%",height:"25px",marginBottom:"20px"},type:"number",step:"0.01",name:"limit",id:"limit",placeholder:"Limit ($)",value:this.state.limit,min:"0",onChange:this.handleFormInput})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"number",children:"Number"}),Object(f.jsx)("input",{className:"form-control",style:{width:"90%",height:"25px",marginBottom:"20px"},type:"number",name:"number",id:"number",placeholder:"Number",value:this.state.number,min:"0",onChange:this.handleFormInput})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{htmlFor:"amount",children:"Amount"}),Object(f.jsx)("input",{className:"form-control",style:{width:"90%",height:"25px",marginBottom:"20px"},type:"number",name:"amount",id:"amount",placeholder:"Amount ($)",value:this.state.limit*this.state.number||0,disabled:!0})]}),Object(f.jsx)("button",{type:"submit",className:"btn btn-primary mt-3",children:"Place order"}),this.state.message&&Object(f.jsx)("h3",{children:this.state.message})]})]}):Object(f.jsx)(f.Fragment,{})}}]),n}(s.Component),B=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"formatCash",value:function(e){return e<1e3?e:e>=1e3&&e<1e6?+(e/1e3).toFixed(1)+"K":e>=1e6&&e<1e9?+(e/1e6).toFixed(1)+"M":e>=1e9&&e<1e12?+(e/1e9).toFixed(1)+"B":e>=1e12?+(e/1e12).toFixed(1)+"T":void 0}},{key:"render",value:function(){var e=this.formatCash(this.props.marketCap);return Object(f.jsxs)("div",{style:{width:"50vw"},className:"ml-5",children:[Object(f.jsx)("h3",{className:"mt-4 mb-4",children:"Summary"}),Object(f.jsxs)("div",{className:"d-flex flex-row justify-content-between align-items-stretch mt-4",children:[Object(f.jsxs)("div",{style:{height:"18vh"},className:"d-flex flex-column justify-content-between align-items-start",children:[Object(f.jsxs)("p",{children:[Object(f.jsx)("strong",{children:"Previous Close:"})," ",this.props.previousClose]}),Object(f.jsxs)("p",{children:[Object(f.jsx)("strong",{children:"52 Week Low:"})," ",this.props.week52Low]}),Object(f.jsxs)("p",{children:[Object(f.jsx)("strong",{children:"PE Ratio (TTM):"}),"  ",this.props.peRatio]})]}),Object(f.jsxs)("div",{style:{height:"18vh"},className:"d-flex flex-column justify-content-between align-items-start",children:[Object(f.jsxs)("p",{children:[Object(f.jsx)("strong",{children:"Market Cap:"})," ",e]}),Object(f.jsxs)("p",{children:[Object(f.jsx)("strong",{children:"52 Week High:"})," ",this.props.week52High]}),Object(f.jsxs)("p",{children:[Object(f.jsx)("strong",{children:"YtD Change:"}),"  ",this.props.ytdChange," %"]})]})]})]})}}]),n}(s.Component),_=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,c=new Array(s),r=0;r<s;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).chartRef=a.a.createRef(),e.state={ticker:e.props.match.params.ticker,myChartRef:void 0,myChart:void 0,companyName:void 0,latestPrice:void 0,change:void 0,changePercent:void 0,latestTime:void 0,marketCap:void 0,peRatio:void 0,avgTotalVolume:void 0,ytdChange:void 0,previousClose:void 0,week52High:void 0,week52Low:void 0,labels:[],data:[],chartRange:"ytd",displayOrderComponent:!1,orderType:void 0},e.handleChartChange=function(t){var n=t.target.name;e.setState({chartRange:n},(function(){e.chartUpdate()}))},e.handleOrder=function(t){var n=t.target.name;e.setState({displayOrderComponent:!0,orderType:n})},e.handleClose=function(t){e.setState({displayOrderComponent:!1})},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.setState({myChartRef:this.chartRef.current.getContext("2d")}),j.a.get("https://".concat("sandbox",".iexapis.com/stable/stock/").concat(this.state.ticker,"/quote?displayPercent=true&token=").concat("Tpk_5e0eaa8b48394791b2acc2314b207df0")).then((function(t){var n=t.data;e.setState({companyName:n.companyName,latestPrice:n.latestPrice.toFixed(2),change:n.change.toFixed(2),changePercent:n.changePercent.toFixed(2),latestTime:n.latestTime,marketCap:n.marketCap,peRatio:n.peRatio,avgTotalVolume:n.avgTotalVolume,ytdChange:n.ytdChange.toFixed(2),previousClose:n.previousClose,week52High:n.week52High,week52Low:n.week52Low})})).catch((function(e){console.log(e)})),this.chartUpdate()}},{key:"chartUpdate",value:function(){var e=this;j.a.get("https://".concat("sandbox",".iexapis.com/stable/stock/").concat(this.state.ticker,"/batch?token=").concat("Tpk_5e0eaa8b48394791b2acc2314b207df0","&types=chart,quote&range=").concat(this.state.chartRange)).then((function(t){var n=t.data.chart.map((function(e){return e.date})),s=t.data.chart.map((function(e){return e.close}));e.setState({data:s,labels:n},(function(){var t=e.state,n=t.data,s=t.labels,a=Math.max.apply(Math,Object(A.a)(n));e.state.myChart&&e.state.myChart.destroy(),e.state.myChart=new k.a(e.state.myChartRef,{type:"line",data:{labels:s,datasets:[{label:"",backgroundColor:"rgb(173,216,230)",borderColor:"rgb(230,230,250)",data:n}]},options:{hover:{mode:"index",intersect:!1},legend:{display:!1},responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{display:!1,ticks:{display:!1}}],yAxes:[{ticks:{suggestedMax:a+.1*a}}]}}})}))})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return Object(f.jsx)("div",{children:Object(f.jsxs)("div",{className:"d-flex flex-row",children:[Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"d-flex flex-row",children:[Object(f.jsxs)("div",{className:"ml-5",children:[Object(f.jsx)("h3",{style:{marginBottom:"0px",paddingTop:"15px"},children:this.state.ticker}),Object(f.jsx)("p",{style:{color:"grey",paddingLeft:"4px",marginBottom:"0px"},children:this.state.companyName})]}),Object(f.jsxs)("div",{style:{width:"32vw",height:"10vh"},className:"d-flex flex-row justify-content-between align-items-center ml-5",children:[Object(f.jsxs)("h1",{children:["$",this.state.latestPrice]}),Object(f.jsxs)("div",{className:"d-flex flex-row",style:{width:"21vw"},children:[Object(f.jsx)("h4",{style:this.state.change<0?{color:"red",marginRight:"5px"}:{color:"green",marginRight:"5px"},children:this.state.change}),Object(f.jsxs)("h4",{style:this.state.changePercent<0?{color:"red"}:{color:"green"},children:["(",this.state.changePercent,"%)"]})]})]})]}),Object(f.jsxs)("div",{style:{width:"70vw"},children:[Object(f.jsx)("div",{className:"d-flex justify-content-end",children:Object(f.jsxs)("div",{style:{width:"15vw"},className:"btn-group me-2",role:"group","aria-label":"Second group",children:[Object(f.jsx)("button",{onClick:this.handleChartChange,name:"1d",type:"button",className:"btn btn-secondary",children:"1D"}),Object(f.jsx)("button",{onClick:this.handleChartChange,name:"1m",type:"button",className:"btn btn-secondary",children:"1M"}),Object(f.jsx)("button",{onClick:this.handleChartChange,name:"ytd",type:"button",className:"btn btn-secondary",children:"YTD"}),Object(f.jsx)("button",{onClick:this.handleChartChange,name:"1y",type:"button",className:"btn btn-secondary",children:"1Y"})]})}),Object(f.jsx)("div",{children:Object(f.jsx)("canvas",{style:{width:"70vw",height:"40vh"},id:"myChart",ref:this.chartRef})}),Object(f.jsx)(B,{previousClose:this.state.previousClose,marketCap:this.state.marketCap,peRatio:this.state.peRatio,week52High:this.state.week52High,week52Low:this.state.week52Low,ytdChange:this.state.ytdChange})]})]}),Object(f.jsxs)("div",{style:{maxWidth:"30vw"},className:"mt-3 d-flex flex-column justify-content-start align-items-center",children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{onClick:this.handleOrder,style:{width:"8vw"},name:"buy",type:"button",className:"btn btn-success btn-lg mr-2",children:"Buy"}),Object(f.jsx)("button",{onClick:this.handleOrder,style:{width:"8vw"},name:"sell",type:"button",className:"btn btn-danger btn-lg",children:"Sell"})]}),Object(f.jsx)(U,{flag:this.state.displayOrderComponent,orderType:this.state.orderType,user:this.props.user,ticker:this.state.ticker,callback:this.handleClose}),Object(f.jsx)(D,{ticker:this.state.ticker,flag:!this.state.displayOrderComponent})]})]})})}}]),n}(s.Component),I=n(7),H=function(e){Object(h.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={user:e.props.user},e.setUser=function(t){e.setState({user:t})},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(f.jsxs)("div",{children:[Object(f.jsx)(g,{user:this.state.user,setUser:this.setUser}),Object(f.jsxs)(I.c,{children:[Object(f.jsx)(I.a,{exact:!0,path:"/",render:function(t){return Object(f.jsx)(M,Object(o.a)({user:e.state.user},t))}}),Object(f.jsx)(I.a,{exact:!0,path:"/signup",render:function(t){return Object(f.jsx)(T,Object(o.a)({setUser:e.setUser},t))}}),Object(f.jsx)(I.a,{exact:!0,path:"/login",render:function(t){return Object(f.jsx)(L,Object(o.a)({setUser:e.setUser},t))}}),Object(f.jsx)(I.a,{exact:!0,path:"/symbols/:ticker",render:function(t){return Object(f.jsx)(_,Object(o.a)({user:e.state.user},t))}})]})]})}}]),n}(a.a.Component),q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,71)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),s(e),a(e),c(e),r(e)}))};n(69);j.a.get("api/auth/loggedin").then((function(e){var t=e.data;r.a.render(Object(f.jsx)(u.a,{children:Object(f.jsx)(H,{user:t})}),document.getElementById("root"))})).catch((function(e){console.log("Error while checking for loggedin user: ",e)})),q()}},[[70,1,2]]]);
//# sourceMappingURL=main.fe709a89.chunk.js.map
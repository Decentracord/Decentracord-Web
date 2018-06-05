(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1130:function(t,e,s){const i=s(428).EventEmitter,r=s(561),n=s(771),o=s(524),a=o.create("orbit-db.replicator",{color:o.Colors.Cyan});o.setLogLevel("ERROR");const h=t=>t.next,l=(t,e)=>t.concat(e),c=t=>null!==t&&void 0!==t,u=(t,e)=>(t[e]=e,t),d=1;t.exports=class extends i{constructor(t,e){super(),this._store=t,this._fetching={},this._stats={tasksRequested:0,tasksStarted:0,tasksProcessed:0,a:0,b:0,c:0,d:0},this._buffer=[],this._concurrency=e||128,this._queue={},this._q=new Set,this._flushTimer=setInterval(()=>{0===this.tasksRunning&&Object.keys(this._queue).length>0&&(a.error("Had to flush the queue!",Object.keys(this._queue).length,"items in the queue, ",this.tasksRequested,this.tasksFinished," tasks requested/finished"),setTimeout(()=>this._processQueue(),0))},3e3)}get tasksRequested(){return this._stats.tasksRequested}get tasksStarted(){return this._stats.tasksStarted}get tasksRunning(){return this._stats.tasksStarted-this._stats.tasksProcessed}get tasksQueued(){return Object.keys(this._queue).length-this.tasksRunning}get tasksFinished(){return this._stats.tasksProcessed}getQueue(){return Object.values(this._queue)}load(t){this._stats.a+=1;const e=t=>!this._store._oplog.has(t.hash||t)&&!this._queue[t.hash||t];try{t.filter(c).filter(e).forEach(this._addToQueue.bind(this)),setTimeout(()=>this._processQueue(),0)}catch(t){console.error(t)}this._stats.a--}_addToQueue(t){this._stats.b++;const e=t.hash||t;this._store._oplog.has(e)||this._fetching[e]||this._queue[e]?this._stats.b--:(this._stats.tasksRequested+=1,this._queue[e]=t,this._stats.b--)}async _processQueue(){if(this._stats.c++,this.tasksRunning<this._concurrency){const t=this._concurrency-this.tasksRunning,e=Object.values(this._queue).slice(0,t).filter(c);e.forEach(t=>delete this._queue[t.hash||t]);const s=t=>t.reduce(l,[]).reduce(u,{}),i=t=>{const s=Object.values(t).filter(c);if(e.length>0&&this._buffer.length>0||0===this.tasksRunning&&this._buffer.length>0){const t=this._buffer.slice();this._buffer=[],this.emit("load.end",t)}s.length>0&&this.load(s),this._stats.c--};return r(e,t=>this._processOne(t)).then(s).then(i)}}async _processOne(t){this._stats.d++;const e=t.hash||t;if(this._store._oplog.has(e)||this._fetching[e])return void this._stats.d--;this._fetching[e]=e,this.emit("load.added",t),this._stats.tasksStarted+=1;const s=await n.fromEntryHash(this._store._ipfs,e,this._store._oplog.id,d,[],this._store.key,this._store.access.write);this._buffer.push(s);const i=s.values[0];return delete this._queue[e],this._stats.tasksProcessed+=1,this.emit("load.progress",this._id,e,i,null,this._buffer.length),this._stats.d--,s.values.map(h).reduce(l,[])}}},1131:function(t,e,s){"use strict";t.exports=class{constructor(t){this.id=t,this._index=[]}get(){return this._index}updateIndex(t,e){this._index=t.values}}},1132:function(t,e,s){"use strict";t.exports=function(t,e,s){var i={},r={};return t.forEach(t=>r[s?t[s]:t]=!0),e.reduce((t,e)=>{var n=void 0!==r[s?e[s]:e],o=void 0!==i[s?e[s]:e];return n||o||(t.push(e),i[s?e[s]:e]=!0),t},[])}},1133:function(t,e,s){"use strict";t.exports=function(t,e,s){var i={},r={};return t.forEach(t=>r[s?t[s]:t]=!0),e.reduce((t,e)=>{var n=void 0!==r[s?e[s]:e],o=void 0!==i[s?e[s]:e];return n&&!o&&(t.push(e),i[s?e[s]:e]=!0),t},[])}},1134:function(t,e,s){"use strict";const i=t=>new Promise(e=>{e(t())});t.exports=((t,e)=>i(function s(){if(t())return i(e).then(s)}))},1135:function(t,e,s){"use strict";const i=s(1134),r=s(561),n=s(622);class o{static fetchParallel(t,e,s,i=[],n,a,h){const l=(t,e)=>t.concat(e);return r(e,e=>o.fetchAll(t,e,s,i,a,h),{concurrency:Math.max(n||e.length,1)}).then(t=>t.reduce(l,[]))}static fetchAll(t,e,s,r=[],o=null,a){let h=[],l={},c=Array.isArray(e)?e.slice():[e];const u=t=>c.push(t);r.forEach(t=>l[t.hash]=t);return i(()=>c.length>0&&(h.length<s||s<0),()=>{const e=c.shift();return l[e]?Promise.resolve():new Promise((s,i)=>{const r=o?setTimeout(()=>{console.warn(`Warning: Couldn't fetch entry '${e}', request timed out (${o}ms)`),s()},o):null;0,n.fromMultihash(t,e).then(t=>{clearTimeout(r),n.isEntry(t)&&(t.next.forEach(u),h.push(t),l[e]=t,0,a&&a(e,t,h.length))}).then(s).catch(t=>{s()})})}).then(()=>h)}}t.exports=o},1136:function(t,e,s){"use strict";s(561);const i=s(622),r=s(1135),n=s(621),o=s(770),a=s(620),h=s(769),l=s(1133),c=s(1132),u=(t,e)=>t.slice(t.length-e,t.length);t.exports=class{static toMultihash(t,e){if(!a(t))throw o.ImmutableDBNotDefinedError();if(!a(e))throw o.LogNotDefinedError();if(e.values.length<1)throw new Error("Can't serialize an empty log");return t.object.put(e.toBuffer()).then(t=>t.toJSON().multihash)}static fromMultihash(t,e,s=-1,h,l){if(!a(t))throw o.ImmutableDBNotDefinedError();if(!a(e))throw new Error(`Invalid hash: ${e}`);return t.object.get(e,{enc:"base58"}).then(t=>JSON.parse(t.toJSON().data)).then(e=>{if(!e.heads||!e.id)throw o.NotALogError();return r.fetchAll(t,e.heads,s,h,null,l).then(t=>{const s=t.reduce((t,e)=>e.clock.time>t.time?new n(e.clock.id,e.clock.time):t,new n(e.id)),r=t.slice().sort(i.compare),o=r.filter(t=>e.heads.includes(t.hash));return{id:e.id,values:r,heads:o,clock:s}})})}static fromEntryHash(t,e,s,i=-1,n,h){if(!a(t))throw o.IpfsNotDefinedError();if(!a(e))throw new Error("'entryHash' must be defined");i=i>-1?Math.max(i,1):i;const l=n;return r.fetchParallel(t,[e],i,l,null,null,h).then(t=>({values:i>-1?u(t,i):t}))}static fromJSON(t,e,s=-1,n,h,l){if(!a(t))throw o.ImmutableDBNotDefinedError();return r.fetchParallel(t,e.heads.map(t=>t.hash),s,[],16,h,l).then(t=>{const s=t.slice().sort(i.compare);return t.filter(t=>e.heads.includes(t.hash)),{id:e.id,values:s,heads:e.heads}})}static fromEntry(t,e,s=-1,n,l,u,d){if(!a(t))throw o.ImmutableDBNotDefinedError();if(!a(e))throw new Error("'sourceEntries' must be defined");if(!Array.isArray(e)&&!i.isEntry(e))throw new Error("'sourceEntries' argument must be an array of Entry instances or a single Entry");Array.isArray(e)||(e=[e]),s=s>-1?Math.max(s,e.length):s;const p=n?n.map(t=>t.hash?t.hash:t):n,f=e.map(t=>t.hash);return r.fetchParallel(t,f,s,p,null,null,d).then(t=>{var r=e.concat(t),n=h(r,"hash").sort(i.compare);const o=n.slice(s>-1?-s:-n.length),a=c(o,e,"hash"),l=(_=a,o=(g=o).slice(_.length,g.length),_.concat(o));return{id:l[l.length-1].id,values:l}});var g,_,m}static expandFrom(t,e,s,i=-1){if(!a(t))throw o.ImmutableDBNotDefinedError();if(!a(e))throw o.LogNotDefinedError();if(!a(s))throw new Error("'entries' must be given as argument");Array.isArray(s)||(s=[s]);const n=s.map(t=>t.next).filter(t=>t.length>0);return 0===n.length?Promise.resolve({values:e.values}):r.fetchParallel(t,n,i,e.values).then(t=>({values:e.merge(t.slice(0,i))}))}static expand(t,e,s=-1){if(!a(t))throw o.ImmutableDBNotDefinedError();if(!a(e))throw o.LogNotDefinedError();return 0===e.tailHashes.length?Promise.resolve({values:e.values}):r.fetchParallel(t,e.tailHashes,s,e.values).then(t=>{const r=s>-1?e.values.length+s:-1,n=e.values.concat(t).sort(i.compare),o=r>-1?n.slice(-r):n.slice(),a=c(o,e.values,"hash").sort(i.compare),u=c(e.values,o,"hash").sort(i.compare),d=l(e.values,o,"hash").sort(i.compare),p=r-(d.length+a.length),f=(t,e)=>{var s;return s=t.concat(e),h(s,"hash").sort(i.compare)};return{values:f(a,f(d,p>-1?u.slice(-p):u))}})}}},1137:function(t,e,s){"use strict";t.exports=class{constuctor(t){}append(t){}merge(t){}get(t){}has(t){}get values(){}get length(){}}},1138:function(t,e,s){"use strict";t.exports=((t,e,s)=>new Promise((i,r)=>{const n=t[Symbol.iterator]();let o=0;const a=t=>{const s=n.next();s.done?i(t):Promise.all([t,s.value]).then(t=>{a(e(t[0],t[1],o++))}).catch(r)};a(s)}))},1139:function(t,e,s){"use strict";const i=s(1138);t.exports=((t,e)=>i(t,(t,s,i)=>e(s,i)).then(()=>t))},414:function(t,e,s){"use strict";(function(e){s(476);const i=s(428).EventEmitter,r=s(462),n=s(1139),o=s(771),a=s(1131),h=s(1130),l=s(524),c=l.create("orbit-db.store",{color:l.Colors.Blue});l.setLogLevel("ERROR");const u={Index:a,maxHistory:-1,path:"./orbitdb",replicate:!0,referenceCount:64,replicationConcurrency:128};t.exports=class{constructor(t,e,s,r){let n=Object.assign({},u);Object.assign(n,r),this.options=n,this._type="store",this.id=e,this.address=s,this.dbname=s.path||"",this.events=new i,this._ipfs=t,this._cache=r.cache,this._index=new this.options.Index(this.id),this._keystore=r.keystore,this._key=r&&r.key?r.key:this._keystore.getKey(e)||this._keystore.createKey(e),this._ipfs.keystore=this._keystore;const a={admin:[this._key.getPublic("hex")],read:[],write:[this._key.getPublic("hex")]};this.access=r.accessController||a,this._oplog=new o(this._ipfs,this.id,null,null,null,this._key,this.access.write),this._replicationInfo={buffered:0,queued:0,progress:0,max:0},this._stats={snapshot:{bytesLoaded:-1},syncRequestsReceieved:0};try{this._loader=new h(this,this.options.replicationConcurrency),this._loader.on("load.added",t=>{this._replicationInfo.queued++,this._replicationInfo.max=Math.max.apply(null,[this._replicationInfo.max,this._oplog.length,t.clock?t.clock.time:0]),this.events.emit("replicate",this.address.toString(),t)}),this._loader.on("load.progress",(t,e,s,i,r)=>{this._replicationInfo.buffered>r?this._replicationInfo.progress=this._replicationInfo.progress+r:this._replicationInfo.progress=Math.max.apply(null,[this._oplog.length,this._replicationInfo.progress,this._oplog.length+r]),this._replicationInfo.buffered=r,this._replicationInfo.max=Math.max.apply(null,[this._replicationInfo.max,this._replicationInfo.progress]),this.events.emit("replicate.progress",this.address.toString(),e,s,this._replicationInfo.progress,i)});const t=async(t,e)=>{try{for(let e of t)await this._oplog.join(e,-1,this._oplog.id);this._replicationInfo.max=Math.max(this._replicationInfo.max,this._oplog.length),this._index.updateIndex(this._oplog),this._replicationInfo.progress=Math.max.apply(null,[this._replicationInfo.progress,this._oplog.length]),this._replicationInfo.queued-=t.length,this.events.emit("replicated",this.address.toString(),t.length)}catch(t){console.error(t)}};this._loader.on("load.end",t)}catch(t){console.error("Store Error:",t)}}get all(){return Array.isArray(this._index._index)?this._index._index:Object.keys(this._index._index).map(t=>this._index._index[t])}get type(){return this._type}get key(){return this._key}async close(){return this._replicationInfo={buffered:0,queued:0,progress:0,max:0},this._stats={snapshot:{bytesLoaded:-1},syncRequestsReceieved:0},this.events.removeAllListeners("load"),this.events.removeAllListeners("load.progress"),this.events.removeAllListeners("replicate"),this.events.removeAllListeners("replicate.progress"),this.events.removeAllListeners("replicated"),this.events.removeAllListeners("ready"),this.events.removeAllListeners("write"),await this._cache.close(),this.events.emit("closed",this.address.toString()),Promise.resolve()}async drop(){await this.close(),await this._cache.destroy(),this._index=new this.options.Index(this.id),this._oplog=new o(this._ipfs,this.id,null,null,null,this._key,this.access.write),this._cache=this.options.cache}async load(t){t=t||this.options.maxHistory;const e=await this._cache.get("_localHeads")||[],s=await this._cache.get("_remoteHeads")||[],i=e.concat(s);i.length>0&&this.events.emit("load",this.address.toString(),i),await n(i,async e=>{this._replicationInfo.max=Math.max(this._replicationInfo.max,e.clock.time);let s=await o.fromEntryHash(this._ipfs,e.hash,this._oplog.id,t,this._oplog.values,this.key,this.access.write,this._onLoadProgress.bind(this));await this._oplog.join(s,t,this._oplog.id),this._replicationInfo.progress=Math.max.apply(null,[this._replicationInfo.progress,this._oplog.length]),this._replicationInfo.max=Math.max.apply(null,[this._replicationInfo.max,this._replicationInfo.progress])}),i.length>0&&this._index.updateIndex(this._oplog),this.events.emit("ready",this.address.toString(),this._oplog.heads)}sync(t){if(this._stats.syncRequestsReceieved+=1,c.debug(`Sync request #${this._stats.syncRequestsReceieved} ${t.length}`),0!==t.length)return n(t,t=>{if(!t)return console.warn("Warning: Given input entry was 'null'."),Promise.resolve(null);if(!this.access.write.includes(t.key)&&!this.access.write.includes("*"))return console.warn("Warning: Given input entry is not allowed in this log and was discarded (no write access)."),Promise.resolve(null);const s=Object.assign({},t);return s.hash=null,this._ipfs.object.put(e.from(JSON.stringify(s))).then(t=>t.toJSON().multihash).then(e=>(e!==t.hash&&console.warn("\"WARNING! Head hash didn't match the contents"),e)).then(()=>t)}).then(async e=>(await this._cache.set("_remoteHeads",t),c.debug(`Saved heads ${t.length} [${e.map(t=>t.hash).join(", ")}]`),this._loader.load(e.filter(t=>null!==t))))}loadMoreFrom(t,e){this._loader.load(e)}async saveSnapshot(){const t=this._loader.getQueue();let s=this._oplog.toSnapshot(),i=new e(JSON.stringify({id:s.id,heads:s.heads,size:s.values.length,type:this.type}));const n=new r;let o=new Uint16Array([i.length]),a=new e(o.buffer);n.push(a),n.push(i),s.values.forEach(t=>{let s=new e(JSON.stringify(t)),i=new Uint16Array([s.length]);n.push(new e(i.buffer)),n.push(s)}),n.push(null);const h={path:this.address.toString(),content:n},l=await this._ipfs.files.add(h);return await this._cache.set("snapshot",l[l.length-1]),await this._cache.set("queue",t),c.debug(`Saved snapshot: ${l[l.length-1].hash}, queue length: ${t.length}`),l}async loadFromSnapshot(t){this.events.emit("load",this.address.toString());const s=await this._cache.get("queue");this.sync(s||[]);const i=await this._cache.get("snapshot");if(!i)throw new Error(`Snapshot for ${this.address} not found!`);{const t=await this._ipfs.files.catReadableStream(i.hash),s=()=>new Promise((s,i)=>{let r=new e(0),n=[];t.on("data",t=>{if(this._byteSize+=t.length,n.length<2e4)n.push(t);else{const t=e.concat(n);r=e.concat([r,t]),n=[]}}),t.on("end",()=>{if(n.length>0){const t=e.concat(n);r=e.concat([r,t])}function t(t){for(var e=new ArrayBuffer(t.length),s=new Uint8Array(e),i=0;i<t.length;++i)s[i]=t[i];return e}const i=parseInt(new Uint16Array(t(r.slice(0,2))));let o;try{o=JSON.parse(r.slice(2,i+2))}catch(t){}let a=[],h=2+i;for(;h<r.length;){const e=parseInt(new Uint16Array(t(r.slice(h,h+2))));h+=2;const s=r.slice(h,h+e);try{const t=JSON.parse(s);a.push(t)}catch(t){}h+=e}o?(this._type=o.type,this._replicationInfo.max=Math.max(this._replicationInfo.max,a.reduce((t,e)=>Math.max(t,e.clock.time),0)),s({values:a,id:o.id,heads:o.heads,type:o.type})):(this._replicationInfo.max=0,s({values:a,id:null,heads:null,type:null}))})}),r=(t,e,s,i)=>{this._replicationInfo.max=Math.max(this._replicationInfo.max,e.clock.time),this._replicationInfo.progress=Math.max.apply(null,[this._replicationInfo.progress,s,this._oplog.length]),this._onLoadProgress(t,e,this._replicationInfo.progress,this._replicationInfo.max)},n=await s();if(n){const t=await o.fromJSON(this._ipfs,n,-1,this._key,this.access.write,1e3,r);await this._oplog.join(t,-1,this._oplog.id),this._replicationInfo.max=Math.max.apply(null,[this._replicationInfo.max,this._replicationInfo.progress,this._oplog.length]),this._replicationInfo.progress=Math.max(this._replicationInfo.progress,this._oplog.length),this._index.updateIndex(this._oplog),this.events.emit("replicated",this.address.toString())}this.events.emit("ready",this.address.toString(),this._oplog.heads)}return this}async _addOperation(t,e,s,i){if(this._oplog){const e=await this._oplog.append(t,this.options.referenceCount);return this._replicationInfo.progress++,this._replicationInfo.max=Math.max.apply(null,[this._replicationInfo.max,this._replicationInfo.progress,e.clock.time]),this.address.toString(),await this._cache.set("_localHeads",[e]),this._index.updateIndex(this._oplog),this.events.emit("write",this.address.toString(),e,this._oplog.heads),i&&i(e),e.hash}}_addOperationBatch(t,e,s,i){throw new Error("Not implemented!")}_onLoadProgress(t,e,s,i){this.events.emit("load.progress",this.address.toString(),t,e,Math.max(this._oplog.length,s),Math.max(this._oplog.length||0,this._replicationInfo.max||0))}}}).call(this,s(417).Buffer)},524:function(t,e,s){"use strict";(function(e){const i=s(768),r=s(463).format,n=s(428).EventEmitter;let o=!!e.version;const a={DEBUG:"DEBUG",INFO:"INFO",WARN:"WARN",ERROR:"ERROR",NONE:"NONE"};let h=a.DEBUG,l=null,c=new n,u={Black:0,Red:1,Green:2,Yellow:3,Blue:4,Magenta:5,Cyan:6,Grey:7,White:9,Default:9};o||(u={Black:"Black",Red:"IndianRed",Green:"LimeGreen",Yellow:"Orange",Blue:"RoyalBlue",Magenta:"Orchid",Cyan:"SkyBlue",Grey:"DimGrey",White:"White",Default:"Black"});const d=[u.Cyan,u.Green,u.Yellow,u.Red,u.Default],p={useColors:!0,color:u.Default,showTimestamp:!0,showLevel:!0,filename:l,appendFile:!0};t.exports={Colors:u,LogLevels:a,setLogLevel:t=>{h=t},setLogfile:t=>{l=t},create:(t,s)=>{return new class{constructor(t,e){this.category=t;let s={};Object.assign(s,p),Object.assign(s,e),this.options=s}debug(){this._shouldLog(a.DEBUG)&&this._write(a.DEBUG,r.apply(null,arguments))}log(){this._shouldLog(a.DEBUG)&&this.debug.apply(this,arguments)}info(){this._shouldLog(a.INFO)&&this._write(a.INFO,r.apply(null,arguments))}warn(){this._shouldLog(a.WARN)&&this._write(a.WARN,r.apply(null,arguments))}error(){this._shouldLog(a.ERROR)&&this._write(a.ERROR,r.apply(null,arguments))}_write(t,e){(this.options.filename||l)&&!this.fileWriter&&o&&(this.fileWriter=i.openSync(this.options.filename||l,this.options.appendFile?"a+":"w+"));let s=this._format(t,e),r=this._createLogMessage(t,e),n=this._createLogMessage(t,e,s.timestamp,s.level,s.category,s.text);this.fileWriter&&o&&i.writeSync(this.fileWriter,r+"\n",null,"utf-8"),o||!this.options.useColors?(console.log(n),c.emit("data",this.category,t,e)):t===a.ERROR?this.options.showTimestamp&&this.options.showLevel?console.error(n,s.timestamp,s.level,s.category,s.text):this.options.showTimestamp&&!this.options.showLevel?console.error(n,s.timestamp,s.category,s.text):!this.options.showTimestamp&&this.options.showLevel?console.error(n,s.level,s.category,s.text):console.error(n,s.category,s.text):this.options.showTimestamp&&this.options.showLevel?console.log(n,s.timestamp,s.level,s.category,s.text):this.options.showTimestamp&&!this.options.showLevel?console.log(n,s.timestamp,s.category,s.text):!this.options.showTimestamp&&this.options.showLevel?console.log(n,s.level,s.category,s.text):console.log(n,s.category,s.text)}_format(t,e){let s="",i="",r="",n=": ";if(this.options.useColors){const e=Object.keys(a).map(t=>a[t]).indexOf(t),h=this.options.color;o?(this.options.showTimestamp&&(s="[3"+u.Grey+"m"),this.options.showLevel&&(i="[3"+d[e]+";22m"),r="[3"+h+";1m",n="[0m: "):(this.options.showTimestamp&&(s="color:"+u.Grey),this.options.showLevel&&(i="color:"+d[e]),r="color:"+h+"; font-weight: bold")}return{timestamp:s,level:i,category:r,text:n}}_createLogMessage(t,e,s,i,r,n){s=s||"",i=i||"",r=r||"",n=n||": ",!o&&this.options.useColors&&(this.options.showTimestamp&&(s="%c"),this.options.showLevel&&(i="%c"),r="%c",n=": %c");let h="";return this.options.showTimestamp&&(h+=(new Date).toISOString()+" "),h=s+h,this.options.showLevel&&(h+=i+"["+t+"]"+(t===a.INFO||t===a.WARN?" ":"")+" "),h+=r+this.category,h+=n+e}_shouldLog(t){let s=void 0!==e&&void 0!==e.env&&void 0!==e.env.LOG?e.env.LOG.toUpperCase():null;const i=(s="undefined"!=typeof window&&window.LOG?window.LOG.toUpperCase():s)||h,r=Object.keys(a).map(t=>a[t]);return r.indexOf(t)>=r.indexOf(i)}}(t,s)},forceBrowserMode:t=>o=!t,events:c}}).call(this,s(154))},561:function(t,e,s){"use strict";t.exports=((t,e,s)=>new Promise((i,r)=>{if(s=Object.assign({concurrency:1/0},s),"function"!=typeof e)throw new TypeError("Mapper function is required");const n=s.concurrency;if(!("number"==typeof n&&n>=1))throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${n}\` (${typeof n})`);const o=[],a=t[Symbol.iterator]();let h=!1,l=!1,c=0,u=0;const d=()=>{if(h)return;const t=a.next(),s=u;if(u++,t.done)return l=!0,void(0===c&&i(o));c++,Promise.resolve(t.value).then(t=>e(t,s)).then(t=>{o[s]=t,c--,d()},t=>{h=!0,r(t)})};for(let t=0;t<n&&(d(),!l);t++);}))},620:function(t,e,s){"use strict";t.exports=(t=>void 0!==t&&null!==t)},621:function(t,e,s){"use strict";class i{constructor(t,e){this.id=t,this.time=e||0}tick(){return new i(this.id,++this.time)}merge(t){return this.time=Math.max(this.time,t.time),new i(this.id,this.time)}clone(){return new i(this.id,this.time)}static compare(t,e){var s=t.time-e.time;return 0===s&&t.id!==e.id?t.id<e.id?-1:1:s}}t.exports=i},622:function(t,e,s){"use strict";(function(e){const i=s(621),r=s(620),n=()=>new Error("Ipfs instance not defined");class o{static async create(t,e,s,a=[],h,l){if(!r(t))throw n();if(!r(e))throw new Error("Entry requires an id");if(!r(s))throw new Error("Entry requires data");if(!r(a)||!Array.isArray(a))throw new Error("'next' argument is not an array");let c={hash:null,id:e,payload:s,next:a.filter(r).map(t=>t.hash?t.hash:t),v:0,clock:new i(e,h?h.time:null)};return t.keystore&&l&&(c=await o.signEntry(t.keystore,c,l)),c.hash=await o.toMultihash(t,c),c}static async signEntry(t,s,i){const r=await t.sign(i,new e(JSON.stringify(s)));return s.sig=r,s.key=i.getPublic("hex"),s}static async verifyEntry(t,s){const i=Object.assign({},{hash:null,id:t.id,payload:t.payload,next:t.next,v:t.v,clock:t.clock}),r=await s.importPublicKey(t.key);await s.verify(t.sig,r,new e(JSON.stringify(i)))}static toMultihash(t,s){if(!t)throw n();const i=e.from(JSON.stringify(s));return t.object.put(i).then(t=>t.toJSON().multihash)}static fromMultihash(t,e){if(!t)throw n();if(!e)throw new Error(`Invalid hash: ${e}`);return t.object.get(e,{enc:"base58"}).then(t=>JSON.parse(t.toJSON().data)).then(t=>{let s={hash:e,id:t.id,payload:t.payload,next:t.next,v:t.v,clock:t.clock};return t.sig&&Object.assign(s,{sig:t.sig}),t.key&&Object.assign(s,{key:t.key}),s})}static isEntry(t){return void 0!==t.id&&void 0!==t.next&&void 0!==t.hash&&void 0!==t.payload&&void 0!==t.v&&void 0!==t.clock}static compare(t,e){var s=i.compare(t.clock,e.clock);return 0===s?t.clock.id<e.clock.id?-1:1:s}static isEqual(t,e){return t.hash===e.hash}static isParent(t,e){return e.next.indexOf(t.hash)>-1}static findChildren(t,e){for(var s=[],i=e.find(e=>o.isParent(t,e)),r=t;i;)s.push(i),r=i,i=e.find(t=>o.isParent(r,t));return s=s.sort((t,e)=>t.clock.time>t.clock.time)}}t.exports=o}).call(this,s(417).Buffer)},769:function(t,e,s){"use strict";t.exports=function(t,e){let s={};return t.forEach(t=>s[e?t[e]:t]=t),Object.keys(s).map(t=>s[t])}},770:function(t,e,s){"use strict";t.exports={ImmutableDBNotDefinedError:()=>new Error("ImmutableDB instance not defined"),LogNotDefinedError:()=>new Error("Log instance not defined"),NotALogError:()=>new Error("Given argument is not an instance of Log")}},771:function(t,e,s){"use strict";(function(e){const i=s(561),r=s(1137),n=s(622),o=s(1136),a=s(770),h=s(621),l=s(620),c=s(769),u=()=>(new Date).getTime().toString(),d=t=>t.hash,p=(t,e)=>t.concat(e),f=t=>t.next,g=(t,e)=>Math.max(t,e.clock.time),_=(t,e)=>(t[e.hash]=e,t);class m extends r{constructor(t,e,s,i,r,n,o=[]){if(!l(t))throw a.ImmutableDBNotDefinedError();if(l(s)&&!Array.isArray(s))throw new Error("'entries' argument must be an array of Entry instances");if(l(i)&&!Array.isArray(i))throw new Error("'heads' argument must be an array");super(),this._storage=t,this._id=e||u(),this._keystore=this._storage.keystore,this._key=n,this._keys=Array.isArray(o)?o:[o],s=s||[],this._entryIndex=s.reduce(_,{}),i=i||m.findHeads(s),this._headsIndex=i.reduce(_,{}),this._nextsIndex={},s.forEach(t=>t.next.forEach(e=>this._nextsIndex[e]=t.hash)),this._length=s?s.length:0;const c=Math.max(r?r.time:0,this.heads.reduce(g,0));this._clock=new h(this.id,c)}get id(){return this._id}get clock(){return this._clock}get length(){return this._length}get values(){return Object.values(this._entryIndex).sort(n.compare)||[]}get heads(){return Object.values(this._headsIndex)||[]}get tails(){return m.findTails(this.values)}get tailHashes(){return m.findTailHashes(this.values)}get(t){return this._entryIndex[t]}has(t){return void 0!==this._entryIndex[t.hash||t]}traverse(t,e){let s=t.map(f).reduce(p,[]),i={},r={},n=0;const o=t=>{r[t]||i[t]||(s.push(t),i[t]=!0)};for(t.forEach(t=>{r[t.hash]=t.hash,i[t.hash]=!0,n++});s.length>0&&n<e;){const t=s.shift(),e=this.get(t);e&&(n++,r[e.hash]=e.hash,i[e.hash]=!0,e.next.forEach(o))}return r}async append(t,e=1){if(this._key&&!this._keys.includes(this._key.getPublic("hex"))&&!this._keys.includes("*"))throw new Error("Not allowed to write");const s=Math.max(this.clock.time,this.heads.reduce(g,0))+1;this._clock=new h(this.clock.id,s);const i=Object.keys(this.traverse(this.heads,e)),r=await n.create(this._storage,this.id,t,i,this.clock,this._key);return this._entryIndex[r.hash]=r,i.forEach(t=>this._nextsIndex[t]=r.hash),this._headsIndex={},this._headsIndex[r.hash]=r,this._length++,r}async join(t,e=-1,s){if(!l(t))throw a.LogNotDefinedError();if(!m.isLog(t))throw a.NotALogError();const r=async t=>{this._keys.map(t=>t.getPublic?t.getPublic("hex"):t);return(await i(t,async t=>{if(!t.key)throw new Error("Entry doesn't have a public key");if(!t.sig)throw new Error("Entry doesn't have a signature");if(1===this._keys.length&&this._keys[0]===this._key&&t.id!==this.id)throw new Error("Entry doesn't belong in this log (wrong ID)");if(this._keys.length>0&&!this._keys.includes("*")&&(o=this._keys.concat([this._key]),t=t,!o.find(e=>e===t.key)))return console.warn("Warning: Input log contains entries that are not allowed in this log. Logs weren't joined."),!1;try{await n.verifyEntry(t,this._keystore)}catch(e){return console.log(e),console.log("Couldn't verify entry:\n",t),!1}return!0})).every(t=>!0===t)};var o,c;s=s||[t,this].sort((t,e)=>t.id>e.id)[0].id;const u=((t,e)=>{let s=Object.keys(t._headsIndex),i={},r={};const n=t=>{i[t]||e.get(t)||(s.push(t),i[t]=!0)};for(;s.length>0;){const o=s.shift(),a=t.get(o);a&&!e.get(o)&&(r[a.hash]=a,i[a.hash]=!0,a.next.forEach(n))}return r})(t,this);if(this._key){if(!await r(Object.values(u)))return this}this._entryIndex=Object.assign(this._entryIndex,u);if(Object.values(u).forEach(t=>t.next.forEach(e=>this._nextsIndex[e]=t.hash)),this._length+=Object.values(u).length,e>-1){let t=this.values;t=t.slice(-e),this._entryIndex=t.reduce(_,{}),this._length=Object.values(this._entryIndex).length}const d=Object.values(u).map(f).reduce(p,[]),y=m.findHeads(Object.values(Object.assign({},this._headsIndex,t._headsIndex))).filter(t=>!d.find(e=>e===t.hash)).filter(t=>!this._nextsIndex[t.hash]).reduce(_,{});this._headsIndex=y;const w=Object.values(this._headsIndex).reduce(g,0),v=new h(this.id,Math.max(this.clock.time,w));return this._id=s,this._clock=v,this}toJSON(){return{id:this.id,heads:this.heads.map(d)}}toSnapshot(){return{id:this.id,heads:this.heads,values:this.values}}toBuffer(){return e.from(JSON.stringify(this.toJSON()))}toString(t){return this.values.slice().reverse().map((e,s)=>{const i=n.findChildren(e,this.values).length;let r=new Array(Math.max(i-1,0));return r=i>1?r.fill("  "):r,(r=i>0?r.concat(["└─"]):r).join("")+(t?t(e.payload):e.payload)}).join("\n")}static isLog(t){return void 0!==t.id&&void 0!==t.heads&&void 0!==t._entryIndex}toMultihash(){return o.toMultihash(this._storage,this)}static fromMultihash(t,e,s=-1,i,r,n){if(!l(t))throw a.ImmutableDBNotDefinedError();if(!l(e))throw new Error(`Invalid hash: ${e}`);return o.fromMultihash(t,e,s,i,n).then(e=>new m(t,e.id,e.values,e.heads,e.clock,r))}static fromEntryHash(t,e,s,i=-1,r,n,h,c){if(!l(t))throw a.ImmutableDBNotDefinedError();if(!l(e))throw new Error("'hash' must be defined");return o.fromEntryHash(t,e,s,i,r,c).then(e=>new m(t,s,e.values,null,null,n,h))}static fromJSON(t,e,s=-1,i,r,n,h){if(!l(t))throw a.ImmutableDBNotDefinedError();return o.fromJSON(t,e,s,i,n,h).then(e=>new m(t,e.id,e.values,null,null,i,r))}static fromEntry(t,e,s=-1,i,r){if(!l(t))throw a.ImmutableDBNotDefinedError();if(!l(e))throw new Error("'sourceEntries' must be defined");return o.fromEntry(t,e,s,i,r).then(e=>new m(t,e.id,e.values))}static expandFrom(t,e,s,i=-1){if(!l(t))throw a.ImmutableDBNotDefinedError();if(!l(e))throw a.LogNotDefinedError();if(!l(s))throw new Error("'entries' must be given as argument");if(!m.isLog(e))throw a.NotALogError();return o.expandFrom(t,e,s,i).then(s=>new m(t,e.id,s.values,null,e.clock))}static expand(t,e,s){if(!l(t))throw a.ImmutableDBNotDefinedError();if(!l(e))throw a.LogNotDefinedError();if(!m.isLog(e))throw a.NotALogError();return o.expand(t,e,s).then(s=>new m(t,e.id,s.values,e.heads,e.clock))}static findHeads(t){var e=t.reduce((t,e,s,i)=>{return e.next.forEach(s=>t[s]=e.hash),t},{});return t.filter(t=>void 0===e[t.hash]).sort((t,e)=>t.id>e.id)}static findTails(t){var e={},s=[],i={},r=[];t.forEach(t=>{0===t.next.length&&s.push(t);t.next.forEach(s=>{e[s]||(e[s]=[]),e[s].push(t)}),r=r.concat(t.next),i[t.hash]=!0});const o=r.filter(t=>void 0===i[t]).map(t=>e[t]).reduce((t,e,s,i)=>t.concat(c(e,"hash")),[]).concat(s);return c(o,"hash").sort(n.compare)}static findTailHashes(t){var e={};return t.forEach(t=>e[t.hash]=!0),t.reduce((t,s,i,r)=>{return s.next.reverse().forEach(s=>{void 0===e[s]&&t.splice(0,0,s)}),t},[])}}t.exports=m}).call(this,s(417).Buffer)}}]);
//# sourceMappingURL=1.bundle.js.map
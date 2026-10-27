import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
test('menu opens, closes on Escape, and forwards search to the host',()=>{
 const documentEvents={},windowEvents={},buttons=[];let panel=null,searchClicks=0;
 for(const name of ['projects','archives','follow','support'])buttons.push({events:{},getAttribute:()=>name,getBoundingClientRect:()=>({left:100,width:60,top:200}),addEventListener(type,fn){this.events[type]=fn}});
 const document={querySelectorAll:()=>buttons,addEventListener(type,fn){documentEvents[type]=fn},getElementById:()=>({click(){searchClicks++}}),createElement(){return {style:{},remove(){panel=null},contains:()=>false}},body:{appendChild(el){panel=el}}};
 const window={innerWidth:390,innerHeight:844,addEventListener(type,fn){windowEvents[type]=fn}};
 vm.runInNewContext(fs.readFileSync('src/menu.js','utf8'),{document,window});
 documentEvents.DOMContentLoaded();
 const click={preventDefault(){},stopPropagation(){}};
 buttons[0].events.click(click);assert.match(panel.innerHTML,/Basketball/);
 documentEvents.keydown({key:'Escape'});assert.equal(panel,null);
 buttons[1].events.click(click);assert.match(panel.innerHTML,/Search/);
 documentEvents.click({target:{closest:()=>true},preventDefault(){}});assert.equal(searchClicks,1);assert.equal(panel,null);
 buttons[2].events.click(click);windowEvents.resize();assert.equal(panel,null);
});
test('all navigation sections and production search templates are included',()=>{
 const html=fs.readFileSync('src/menu.html','utf8');
 for(const name of ['projects','archives','follow','support'])assert(html.includes(`data-nashp-popover="${name}"`));
 for(const file of ['blot/search.html','blot/search-data.html'])assert(fs.statSync(file).size>0);
});

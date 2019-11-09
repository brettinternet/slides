function inIframe(){try{return window.self!==window.top;}catch(e){return true;}}
function camelize(map){if(map){Object.keys(map).forEach(function(k){newK=k.replace(/(\_\w)/g,function(m){return m[1].toUpperCase();});if(newK!=k){map[newK]=map[k];delete map[k];}});}
return map;}
if(typeof Object.assign!="function"){Object.defineProperty(Object,"assign",{value:function assign(target,varArgs){"use strict";if(target==null){throw new TypeError("Cannot convert undefined or null to object");}
var to=Object(target);for(var index=1;index<arguments.length;index++){var nextSource=arguments[index];if(nextSource!=null){for(var nextKey in nextSource){if(Object.prototype.hasOwnProperty.call(nextSource,nextKey)){to[nextKey]=nextSource[nextKey];}}}}
return to;},writable:true,configurable:true});}
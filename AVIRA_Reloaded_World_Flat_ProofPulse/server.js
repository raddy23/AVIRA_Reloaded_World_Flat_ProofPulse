import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';
import { getSigningKeys,createIncident,addCheck,createReceipt,validateReceipt } from './lib/proof.js';
import { rpc,parseReceipt,CHAIN_ID,WIF,isAddress,isTxHash } from './lib/chain.js';
const ROOT=process.cwd(),DATA=process.env.PROOFPULSE_DATA_DIR||join(ROOT,'data'),publicDir=join(ROOT,'public');
const port=Number(process.env.PORT||8081),keys=getSigningKeys(DATA);const cases=new Map();
const dbFile=join(DATA,'cases.json');try{for(const c of JSON.parse((await readFile(dbFile)).toString()))cases.set(c.id,c)}catch{}
const save=async()=>{await mkdir(DATA,{recursive:true});await writeFile(dbFile,JSON.stringify([...cases.values()],null,2));};
const body=async req=>{let value='';for await(const part of req){value+=part;if(value.length>100000)throw Error('Request too large');}return JSON.parse(value||'{}');};
const send=(res,code,data)=>{res.writeHead(code,{'content-type':'application/json; charset=utf-8','cache-control':'no-store','access-control-allow-origin':'same-origin'});res.end(JSON.stringify(data));};
const fail=(res,e)=>send(res,400,{error:String(e.message||e)});
async function serve(req,res){try{
const url=new URL(req.url,'http://localhost');const p=url.pathname;
if(p==='/api/config'&&req.method==='GET')return send(res,200,{chainId:CHAIN_ID,token:WIF,network:'Robinhood Chain Mainnet',walletRequired:true});
if(p==='/api/cases'&&req.method==='GET')return send(res,200,{cases:[...cases.values()].reverse().slice(0,100)});
if(p==='/api/cases'&&req.method==='POST'){const a=await body(req);const c=createIncident(a);addCheck(c,'initial',c.statusCode);c.receipt=createReceipt(keys,{caseId:c.id,title:c.title,service:c.service,check:c.checks[0]});cases.set(c.id,c);await save();return send(res,201,{case:c});}
const m=p.match(/^\/api\/cases\/([0-9a-f-]{36})(?:\/(recheck|challenge|payment))?$/i);
if(m){const c=cases.get(m[1]);if(!c)return send(res,404,{error:'Unknown case'});if(req.method==='GET'&&!m[2])return send(res,200,{case:c});if(req.method==='POST'&&m[2]==='recheck'){const a=await body(req);const ch=addCheck(c,'recheck',a.statusCode);c.receipt=createReceipt(keys,{caseId:c.id,title:c.title,service:c.service,check:ch,previous:c.checks[0]});await save();return send(res,200,{case:c});}
if(req.method==='POST'&&m[2]==='challenge'){const a=await body(req);c.challenge={openedAt:new Date().toISOString(),description:String(a.description||'Independently recheck this incident').slice(0,400),status:'OPEN'};await save();return send(res,200,{case:c});}
if(req.method==='POST'&&m[2]==='payment'){const a=await body(req);if(!isTxHash(a.transactionHash)||!isAddress(a.to)||!isAddress(a.from)|| !/^\d+$/.test(a.units||''))throw Error('Invalid transfer verification request');const chain=await rpc('eth_chainId');if(Number(BigInt(chain))!==CHAIN_ID)throw Error('RPC returned wrong chain');const transaction=await rpc('eth_getTransactionByHash',[a.transactionHash]);if(!transaction||transaction.to?.toLowerCase()!==WIF.toLowerCase()||transaction.from?.toLowerCase()!==a.from.toLowerCase())throw Error('Payment transaction does not match official token and sender');const r=await rpc('eth_getTransactionReceipt',[a.transactionHash]);const proof=parseReceipt(r,{expectedTo:a.to,expectedFrom:a.from,expectedUnits:a.units});if([...cases.values()].some(item=>item.payments.some(x=>x.transactionHash===a.transactionHash)))throw Error('Transaction already registered');c.payments.push({...proof,verifiedAt:new Date().toISOString(),caseId:c.id});await save();return send(res,200,{payment:proof,case:c});}
}
if(p==='/api/verify-receipt'&&req.method==='POST'){const a=await body(req);return send(res,200,{valid:validateReceipt(a.receipt)});}
if(!['GET','HEAD'].includes(req.method))return send(res,405,{error:'Method not allowed'});
let pathname=p==='/'?'/index.html':p;let path=resolve(publicDir,'.'+pathname);if(!path.startsWith(resolve(publicDir)+sep))return send(res,403,{error:'Forbidden'});
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
let data;try{data=await readFile(path)}catch{return send(res,404,{error:'Not found'})}res.writeHead(200,{'content-type':mime[extname(path)]||'application/octet-stream','x-content-type-options':'nosniff','content-security-policy':"default-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; base-uri 'none'; form-action 'self'"});res.end(req.method==='HEAD'?'':data);
}catch(e){fail(res,e)}}
if(process.argv[1]&&import.meta.url===new URL('file://'+resolve(process.argv[1])).href){http.createServer(serve).listen(port,'0.0.0.0',()=>console.log(`ProofPulse on http://localhost:${port}`));}
export {serve};

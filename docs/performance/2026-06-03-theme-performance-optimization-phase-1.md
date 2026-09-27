# 涓婚鎬ц兘浼樺寲锛堢 1 杞級

鏃ユ湡锛?026-06-03
鍒嗘敮锛歚codex/performance-optimization-main`
鐗堟湰鐩爣锛歚4.10.0`

## 鏈疆鍙樻洿

### 1) 鍏ㄥ眬鎻掍欢鍔犺浇浼樺寲
- 鏂囦欢锛歚components/ExternalPlugins.js`
- 鏀瑰姩锛?  - 灏嗚嚜瀹氫箟澶栭儴璧勬簮鍔犺浇浠庣粍浠舵覆鏌撴湡绉诲叆 `useEffect`锛屽苟鏀逛负寮傛璋冨害锛坄requestIdleCallback` / `setTimeout`锛夋墽琛屻€?  - 瀵?`CUSTOM_EXTERNAL_CSS`銆乣CUSTOM_EXTERNAL_JS` 鍋?`useMemo` 杩囨护锛岄伩鍏嶉噸澶嶈绠椾笌閲嶅娉ㄥ叆銆?  - 灏?`GLOBAL_JS` 鎵ц浠庢棤渚濊禆鐨勫壇浣滅敤鏀逛负 `useEffect([GLOBAL_JS])`锛屽苟鍔?`try/catch`锛岄伩鍏嶆瘡娆?render 閲嶅鎵ц瀵艰嚧閲嶅娉ㄥ叆涓庢綔鍦ㄩ樆濉炪€?
### 2) Typography 鎼滅储楂樹寒鎸夐渶鍔犺浇
- 鏂囦欢锛歚themes/typography/index.js`
- 鏀瑰姩锛?  - `LayoutSearch` 涓皢 `replaceSearchResult` 杩佺Щ涓烘寜闇€鍔ㄦ€?import锛堜粎鍦ㄦ悳绱㈤〉鐢熸晥鏃惰Е鍙戯級锛岄伩鍏嶉椤?鏂囩珷椤靛垵濮嬪寘瑁瑰叆杩欓儴鍒嗕唬鐮併€?  - 灏嗘悳绱㈤珮浜寕杞芥敼涓哄欢鍚庢墽琛岋紙`requestIdleCallback` 鎴?fallback timeout锛夛紝闄嶄綆棣栧睆闃诲銆?
### 3) 鎼滅储楂樹寒閫昏緫缁熶竴浼樺寲锛堣法涓婚锛?- 鏂囦欢锛歚components/Mark.js`
- 鏀瑰姩锛?  - 灏?`mark.js` 搴撳姞杞芥敼涓轰竴娆℃€?Promise 缂撳瓨锛岄伩鍏嶅悓涓€娆′細璇濆唴閲嶅璇锋眰銆?  - 瀵规悳绱㈠叧閿瘝杩涜瀹夊叏杞箟锛岄伩鍏嶅紓甯告鍒欏鑷撮珮浜矾寰勪腑鏂€?  - 鐢?`requestIdleCallback`锛堝吋瀹?fallback锛夊皢楂樹寒鎵ц寤跺悗锛屽噺灏戠洿鎺ラ樆濉炰富绾跨▼楂樺嘲銆?  - 淇濇寔鐜版湁楂樹寒杈撳嚭锛坈lassName/element锛変笌閰嶇疆涓嶅彉銆?
### 4) 涓婚鎬ц兘瀹¤鑴氭湰璺ㄥ钩鍙板吋瀹逛慨澶?- 鏂囦欢锛歚scripts/audit-theme-performance.js`
- 鏀瑰姩锛?  - 鎸夊钩鍙伴€夋嫨 `lighthouse` 鍙墽琛岃矾寰勶紙Windows 浼樺厛 `lighthouse.cmd`锛屾湭鍛戒腑鏃堕檷绾у埌 `lighthouse` 鎴栧寘鍐?CLI 鍏ュ彛锛夈€?  - `runLighthouse` 鎵ц璺緞鏀逛负鍙橀噺鍖栵紝閬垮厤 Windows 涓?`spawnSync` 璇嗗埆闂銆?  - `main` 鏀逛负鍚屾娴佺▼锛岀Щ闄?`async`/.`catch` 鐨勪笉鍖归厤璋冪敤銆?
### 5) 涓婚绾ф粴鍔ㄧ洃鍚紭鍖栵紙璺ㄤ富棰橈級
- 鏂囦欢锛歚themes/*/components/*.js`
- 鏀瑰姩锛?  - 灏嗗ぇ閲忎粎璇绘粴鍔ㄤ綅缃?杩涘害鐨勭洃鍚櫒鏀逛负 `passive: true` 娉ㄥ唽锛屽噺灏戞粴鍔ㄤ簨浠跺涓荤嚎绋嬭皟搴﹀帇鍔涖€?  - 瑕嗙洊鑼冨洿锛欳atalog銆丳rogress銆佹诞鍔ㄥ鑸€丅ackToTop 绛夊ぇ閲忎富棰樺唴婊氬姩鍦烘櫙锛堝叡 70+ 澶勶級銆?  - 淇濇寔琛屼负涓€鑷达紙鐩戝惉閫昏緫鍜屽嵏杞戒粛淇濇寔鍘熸湁鍥炶皟鍖归厤锛夈€?
## 楠岃瘉

- `yarn type-check`锛氶€氳繃
- `yarn build`锛氶€氳繃
- `yarn lint`锛氭湰鏈虹幆澧冩姤閿欌€滄湭璇嗗埆 pages/app 鐩綍鈥濓紝鏆傛湭閫氳繃璇ラ」楠岃瘉锛堜笌褰撳墠 Next.js 鍚姩鐜璺緞瑙ｆ瀽鐩稿叧锛屼笉褰卞搷宸插畬鎴愮紪璇戜笌绫诲瀷鏍￠獙缁撴灉锛?
## 椋庨櫓涓庡奖鍝?- 澶栭儴鑴氭湰鍔犺浇鏀逛负寤惰繜锛屼笉褰卞搷鐜版湁閰嶇疆椤逛笌鎻掍欢寮€鍏抽€昏緫锛坄DISABLE_PLUGIN` 绛変繚鎸佷笉鍙橈級銆?- `GLOBAL_JS` 鍙湪鍐呭鍙樺寲鏃舵墽琛岋紝琛屼负涓庨厤缃粨鏋滀繚鎸佷竴鑷达紝浣嗛檷浣庝簡閲嶅娉ㄥ叆椋庨櫓銆?
## 涓嬩竴姝ヨ鍒掞紙P2锛?- 缁х画姊崇悊涓婚灞傞潰浠嶆湁杈冮噸鐨勯灞忛€昏緫锛堢壒鍒槸鎼滅储銆佺洰褰曘€侀珮棰?DOM 閬嶅巻閫昏緫锛夛紝鎸夊奖鍝嶉潰浼樺厛钀藉湴銆?- 寤虹珛鍙鐢ㄧ殑涓婚绾у欢杩熸墽琛屽熀绾匡紙绌洪棽/婊氬姩瑙﹀彂锛夛紝骞惰ˉ榻愬涓婚瀵规瘮鐨勮嚜鍔ㄥ寲 Lighthouse 鎶ュ憡銆?

## 2026-06-03 Follow-up: Next and Endspace scroll rendering pass

Version: `4.10.0`

### Scope
- `themes/next/components/BlogPostListScroll.js`
- `themes/next/components/StickyBar.js`
- `themes/next/components/Toc.js`
- `themes/next/components/TopNav.js`
- `themes/endspace/components/FloatingControls.js`
- `themes/endspace/components/FloatingToc.js`
- `themes/endspace/components/MobileToc.js`

### Meaning
- Replaced high-frequency lodash throttle scroll handlers with `requestAnimationFrame` scheduling where the UI is tied to visual scroll state.
- Collapsed duplicated progress and TOC scroll listeners in Endspace into a single scroll pipeline per component.
- Added ref-based state guards for reading progress and active TOC section to avoid repeated React state updates with the same value.
- Cached DOM targets such as sticky navigation elements through refs instead of querying on every scroll tick.
- Kept theme APIs, config switches, visual behavior, and plugin behavior unchanged.

### Acceptance
- `yarn -s eslint` on affected files: passed.
- `.\\node_modules\\.bin\\tsc.cmd --noEmit --pretty false`: passed.
- `yarn -s build`: passed.
- Browser validation:
  - `/article/guide?theme=next`: desktop and mobile scroll progress updates, no console errors.
  - `/article/guide?theme=endspace`: desktop and mobile TOC/progress controls remain visible and update on scroll, no console errors.

### Next optimization target
- Build output still warns that `/` and selected article page-data exceed 128KB. The next priority should be reducing serialized page props and trimming data sent to the client before pursuing smaller per-component scroll wins.


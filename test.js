let audioChunks = [];
let mediaRecorder;
let audioBlob;
let audioUrl;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const playBtn = document.getElementById("playBtn");
const audioPlayback = document.getElementById("audioPlayback");
const userBase64Output = document.getElementById("userBase64Output");
const mergedBase64Output = document.getElementById("mergedBase64Output");
const hardcodedBase64Audio = "SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//NkxAAcE7XkAUYYAQhBzyad3ZAhER2iCad3//aIX/Ed3dz4ju//7/ohf8RERCd3d3N3EIien+7uf6Fu7ucd/////0d30RE/+IiILd3P4gGBgbu7uf13f//RERHd3/3ABCF0/d/9z34iIX/////7uAAAAAAAjMPDw8MAAAAVc0vL4OOr4POB3kudHQuYYiSy//NkxBIh/BKBlZhoAFjxyl0gHvfyy3AFjvTGGFoFrZbuXB6kM2HGHwCQC/fQQQsCoEzESSw5P0EFtOn1pkoXRh2/Lp/0xyFvl+6f5mZGyCakLIMXy+YFpcY0//Nihpo7c1X6CZYdU///1Kv0XrV/qQYuGZvUaKb///////TX7oLNzyYRjpo9yzs4IjT0NZrj//NkxA0gkdKEAZt4AGlQBVGxM088ACgcMBFAHRN9SIO1Ve7TihdoJCobmqirIOOlWCbGmyF0ZR6o0CNWbKzB1ruGN5+pIsSDfP9oe/rO4vT2///Dt//7Y//9L6b63pTH8KE999f3T+oYOHw7myLU/I/809SI2sWoDWJ1MlBvmxan+upBl+Sze/Xf7+tMjncU//NkxA0gqpLWX89AAm1YAc7jWK2KkC8bpkLtVzXhw58ZgG41xgAQCJ1wIAqqENF6EHGDRc+R7T//8NdKH5UDjZuqm/////ibiviGaIWP9rqVr63+f///3IMv8vLmTIF9yEGnjB6A+kUYMeoOng0VdrCQFKlu/ZNMFXoaHWDDxPmFEF0k44i17/+wyo4g1EtI//NkxA0f2YqYXtMM7IQ7hgo1jZEWeawwhicBPyqdQS/dhhoC73zgmPuxwigQDNMQAaFpzl5HWnssPRaT2nZ+H5//97wrI7kX/PUlEFg4WhkQQz3F7EQgYgoubDFO73qBAQeLiyJsQDkmlvSNqb/b/Rtsm2xQulZoewmsDlQfdSqAVZ/+a0uOWNorHPfHkEiP//NkxBAgE8q9lsLFF7h7dG21hK1DIO1XgyXap3TXHK7cMRuBeOHjQRPj4PYbh4BMLWKTDHr/7J/j6dXPPCyWbl8pExViCEnIUPMfacQPRSnLZiL2Zb9fq61OU0R/VHv0nde3/6G6nf5zVXt///2/lrR6lapa4pThyXG4OzlqAkSGlUo5+7iiaU1fWIlZOanp//NkxBIgO9axlsPKnwkFUzs9C2aqwC46zAAnEtlwEUvGZ4ih1aqde1sQBjmraE/gxXCno98zyTX8nkkmaqKsqSAYLjGOzbsOcYYdOWQ7I19U+iafVtzbJjo4fEjujIGC9RyNQu3oRvyf3qm/v///9tvJuemTqVjCBCS3zQBCEgiRHf5aipG7CaehA2qitHUX//NkxBQawZqmLsrG7DLgtXI4RIRL6ZA/67Gi3cWYOoFiy1tj9QlRwkhcJD+daYpm+60CSn0JPgj++1dVkaXvTM8kLQOHUGSjQi3kflESeLB01BxV/pd////oUKpDSzYwXoFyCwBCFwCDZd51VUgqOmuzBtIBLTK0IWRMnO4IlqsYJVR9NR7I+Cyrpt9gwr9V//NkxCwc2bqqLsPGVD1LNRPkAtAQbkCC5QgnwQf8aVAESZBZwjbLyIjLoYIAYWVycYYDg+H6ffDlskJVEgYg/F1h/mvRPf/670HIqg4kEVsCqz2tChBqETU+X5h/DqLOV0ZoSx5vF1piy298E0WrVWW2d8ppcrAghmLhcSA6GPVL+3qgqxgJaY2Z6xzVV1LV//NkxDscsvqk7sDE/h1awU23lk1VjUgwFVzMobVQopUN//T9voZ2VJkFU3tspS/832qLP/9qrhKwOGkHjxUGVgk1UCgGCXR/wQGKBA7IfmZYluNCmywqoDgndgBnbmRaKsRTIztUSByNGonAIlctOMSJPLa1VVbJy6JLFSDhgAwjAIhAC5xU3KOn5VaKD4Yc//NkxEscweZkpMmQtKvzTU181Fy3rWVYNSxVLmv9pNUJXFnioS9uEgKJQ7Z+/6h/7PLDzpIBKOnw/ljkbmA4oYQe70aCkkGJcxA+kHu9uoPT//hydIR9YnpmXsIOQUTKGHp/+JvctswHWQlNog5XBAAhzc0EU0Jy/iV+JT3hUnNzQOBAfDBMMagwfBCEQfA4//NkxFsdAfKONkmGvBBsgsoAyHo3Q8fnJBv5AgTZlKyBwcA0Shm5vi3mkjU/ET6GNTiSeInIMzHIlnUq6a6TQFYyqJxbW5+xEf+7647++e2dMqg8H9IQ3yUBlgJgVHUnFx0wXjiTyU7rRgrMRvZK1bpn3WmvWr/WXtvZ9aVynZRRCW1+sqnJfvLOUTqoaUjJ//NkxGooi36MAHsHHW9St2Nb+8DkuOX7ootTI1NyXrFwjXOpnCSmmZfcyJY+jkZNYl//8yiU8ZtwkQxYJLR3BNllYNjN1dULsxkqDHhIoLrjOy2bbw3t+2sOw18Rhd4Lg3GJYg8audppY6XY3460hAgOQmPidkuhAgRiEGZ4xUkGxrpOUQlSxIf//9MzjiTo//NkxEoc+fqUAMpGvK8F5WsSiQRQO9IiVqFmDCiQFQIIodqDriAInTO//6g1/d/+YZdcfiljVkKAEs5yTnv/W9NGBbVvOSkeylMaj7MNYX93q0eQ8Nv1eWZ9/7WyKBt5CXvnqU6ZPxGSolz3va11c/1I6sphgahj2m90mfdW3YqTatzP/9FYrIYv/uUyPsyo//NkxFkcU9auVsMKtKpS3/5n/9P/////R8z/0MbcoeXZ5hkSeqoE0qnruuVmG1imbmm8HCQpaqVJiTxQ0dm51l7rQ7NWWGQJawFEoU6rhZcDN9HImJMBSb/CUoo6/5mtQZlSFI0W/mlTlb9kcztaols6GNO/8IBhwTCcQbHWA2JiCAPPHDzQ458xJW/WLGH+//NkxGoc0eqQ9tGE0K/VRd0AhEDS5moANABJVUht2BGITBu5MQCUtAsRVcZboOLtBSUI0FGw/hvgHgUo6e7HPNq9P8ZJ+Qq0jGZZLo1KKS2cSdGjxYg5bKsfK9iDhYRHiSN//K4fEw6DmNzjkHCaPnF6Gb//3o/ovV2ykejMu7JKIu8eUPf+kTj9Pc3piqCi//NkxHkf4qZ5dOPKlDiqUHVE4moApmx7KRCDHraQCRjBgYLgpAIA/GJhpAIWgGRdcsvjjxuU4E7uWtOqXqd5JzfXbvWKW2wS/jM0747lc03+roWF4A74O+vLFK56yta+ru0Q0Z+YQz/5tuLBkC9PBi2ABAI5vN1X1P9J6EBoxA8P6ZAkqII4HjkW/8UGDNDY//NkxHwiUip8FNmFTPeb9KlvD+FjiaVi8cTqJjscexrTKdx1zbEoNLQmSqGrHF0l3OMLLK999kP9ctsBdp/qTjyUk7jEN7ypbX8pc6t7OISKJVXYf2FUkvcuL5y+N271jLVJayw//+1FmDOQ8SuG4O7qIQ5RuXT2/3XgWNQW11q74yR0X2Ya47iRCQ0ljnN1//NkxHUua/qQHtFT7Ox/////VC8PSiIMJCIUgqxzEq7p9paand3nK7t///41Sh8zhxWId/+T9FH1zIVIgHCiNIkICHkYrmuaN6YJxQJCEmgdlQMGqwUTaU1ugQ7mGUzqqcZgoTKaeOFarfYbTWmLGmAUdPYm1OIcex6lq2a0AOlPry/qd3Sy3ohakfkcYP6H//NkxD4hU9KhtsJLERRChNmP+u31QOeybbeaQrSSudmGvUVGIOERc7NRv//7HI4MeroPLV0f/5lmmt////qhCDmdZP//+pdS2I5zsY+WLRRQrd/B1QBACbAlxufzKMC+ZN24DooOw9E42s2vbj7UMi83vChgLUnhCCQPjyKxmxaA8/vu2hDiwAOJhryOX5qi//NkxDsckxquTsMErFjnQgs4C0lWezt8xUOjWv///1IikV6rOtT/nfs7NK3////mKa4k5lNT7O21oTiE+UcHQQPGlUpVAEASVN171QlUhf+Yxjp7Alo3aOjp4r78XchrA4LtyyzNQpE6fVp1Xf6IJGQcj/0mfT+XYu76DG0lhUYrf//71j6lQ+ax1kjs+25f//NkxEsdIaKmLMPMjDf2Ljn6vOS/2njQWGBYufPaHrewVK//71iO42/qUteqbSbc06TaE3EpNQB2cUaZzy/9WXE47+V4iolGmitowEnmwS9DrTmaYorq4oDGCVjQxjj8Os3m9D7ZEUUvpd93D1kJTo9ZYlhT6ozGpKih2aQGU7FK97f//+yjsRZkICEJkR/v//NkxFkdSxayNsLEtGflLb///+aqnVAYBY9vsv72Hg6dWDTQcEhQqVWqYXRhLb5cm2/zIUYb17mwBXLCGkqRC9w7CyWXbp4tq4HAgo9BNrLcHCSagfMULIUKmidz3H/fqMCev/+2xVFhUTQtWmGaoZUOVkU3///0KpTkayoUBBpzIv/f97////9TxBWnkz7N//NkxGYdW9a+XnoK1e+ZJfnY16yZiszEHji0/VUARJ6Ded1/zYTkIxBgN4DkfBk7AdGp4/FuKSJChO7vzMLDRCAfhTqdiNVrSykAjI35GLO/31aypQUQzK85yqd6qUtCo7HPt//+yEc6lRKWcGqox/y1Of3ud////stBTuhuxf/o++hGo+ip3Mcp0MceGgBA//NkxHMcO+K2NnlE4QPCVTjmeF1pAnS1CXuQcgawsap0um9+u3FipV2CUDxgAaA9gwI02OrJFa8lJaGVQ5D03hvIdsj9DbaMZzixkM7PvYz5n1LUol0///pdFUBOiuAhgxxKOYQe0w6BMGn/+JbgCs5t+UeMeF1TwhcxpAVaCtVOeSR0T3ZS6MrKP1thr8l9//NkxIUdClKiNsoEtI1TCtuXULMV6WosjeLCrX2mhZhJZZnqlTG3Ho5SpRwOSty1Y2+550lKiFmqJUv6+VvmM7sEMhjJf///+Uv2KYj2RjhhkczL///1SinY1lfZWN//9Hl0lK3N6NKqagxjR+ptSVAC468ZZ8MiTlSC6cbEYUzPcDaodlFAgbSNLFVRzrs3//NkxJMcK+qYfspEkUCJADTcEsQuxRfNWBoIt6Sqf6FSQ+byeu5f/T/+nE8veWBFEE+EQscvy/KJqFypESQaALxoEKCf0Kc04IBOkgBBGOtfE4gKQs7t4sxQKgIGnvPVAkioquv7YwMBFDE+K0wAXlyPDgy9hbB7VS1Xjd+vqUSzmrkssd7nHxr41733/uTD//NkxKUdGbaAdtJGhMvu7AchOzLV7MdCs1g/4OdxmSlMSqzUNXq9X4ptjYoloLGkGSZXtypUxLBN1cjS3kBJuiCSD1oo0FeZ5Uu1QF+aRwJxGJMuBJBNIZpl/Ms02rbG7XKecWRyWKJyCrHJlk073Z68/5RpUWnloH3wszoSGTZBMzG9IVPeifo99uHuGNJl//NkxLMzY9aIVNPNHTthDmZD59x7zco0mnzHdPKenzXesaOyHU5GVSEnHJW444pJzK9ovo/1K/CqAJ2KBZBECwWNDF811umnaq+mu0rnwdhJ38ceUTFyAz/z4aAIn5xA7e/TlfciKojkdpedh5GVR+KRgLhOLiosZ55piJpbJhif3sUiWvMGxKW49p+PI/Gi//NkxGgvi+a+XssHH2LRsyy00hrvuY3XLDyhcHlF2pga1upalml7az6NnKUupXMfLYZ318v5//6quxeWx6bG5mIQYw7medVjoUHeMX7IhK0RRAkOLTFKdci0rjZGGQW2YMWBqmAxWni4nWWza/eF+omVCL9p2ipuBeXoyJMCRQM4rd1bq2Wd5qHNw8zJceUq//NkxCwhe+rHHsJLCbZWUqkTYkuQhjbnvp9OAqK5UQeRDaDBMuYUOxQsMVZB6ZexupbZqOqLdxwsv//ppd7mMdhUIi4gOYn///b50PzujMNZ3dGvXa/9zellKSdP7/RTGYplKYcnEREASWaFZxyqNT521gPsrb1QwE0l/CNQ6gOENgUjq7nJWb/513303USi//NkxCkcQo6/HnsEcCBQGxHyoGFcQtHQ+ZNUrUOxrlrRFr9lyHPRLYdGQEyf//suao8hGZ3I30I1AgIuFT4PiwPrHFJdAfCxXQ3rPrRD5TdxJR7Ti2CpLLY45I3JzUk/BQe8ipqNUjTFOpTrelU+oHPKXccdftxdV/Cx6UKdq1//3KVw71SjyDKqJuJLOLJD//NkxDsq2/beXkIZ6rvlE4zxcggHAgSr5hz44R0SWdj7VXhRhbMrrFf6VeklIIykB45gu0iqg+cWeUHhvX8PRUSI/TcCADMGhyW4YBI0QyoFKpeHYVhwWE4kIAvLg4BgZEgfG1bYSaIBpevmFKryufCQeNBILEgkDgpTAcVKBohn/32tkgcv5iCAR6G5cMja//NkxBIeM/cC/liZXv6uI0D9Ob27mYZtVg+1Njb3f5WkarIl/1t/2t2pemj13v/T9f3KSl+zdf////vfZsUXeRUIRWlG96Fpk8OlsUsrktLprRusRLi8hoTq6Ne4bnC9jemZaPwGHo6FqJcTiq8jUHT/FPLX/byy2xugEFllkLlzZwIxJUIbKV2wbBSXzzUi//NkxBwcMRrWXGBMgpbo41PWfRtGt3Aqmb6NUVZHHs781LdZa5IqSPNqPCzRKFjwdOlYm9kUixpQuogbeRYXPfDBUFtVgGcVQbLjREEqQETXw5YoUebgq62BipgsBgqPCr7T7b/a2SPAwEhdoCbrhEMyoTIRLP9hhvE4jj1KjVuS5VDgzdTWZ9pp6Zma+JNC//NkxC4dE37GWmBFVwmkZBQVEYbMosKENvNa7ZSBMYQogkw05f/8WzWYiKWZ+yf+6lKYfbVUMWdHM2hutepS5cytWu0taTIKWXX/9tW6ChRUk0Mqpnec3brP/ULDuOwQGzd525jZ9qRDHpKxMyFm0TsubETwhCRIWcbWr1ez3b7sbPpvQ9RuRyEELgslsJwq//NkxDwb6jrPHHjFTCu/1EL/QtEJ3eIaITuYQQ/ERE/3d+nf7K8lCNU7/Tv5zqfWocWOf/KG4n/uR+OG1n1HP0V1I1iHdkcCAKduVJZXnGquRlRQ0XUvbGHBRpIKpNwQiFmsWXwAUgnBSmL+4EMcvdXDu9y9ZdrbaF2/COhAKAgDyv/wcJBuDwNEPr1IErHy//NkxE8lO+7PHjBREC95UrwId40+zBzMh/FQZlt+5A5WZtYmlcgd///6CULCFwDURygaCGVdClCaVQzIpx+p5JsDoVJD8g4l4DwXEAc0iHFGSRSbeGd5eJsZABP4c5LbvZPzKXrCqONED1IHI1dZq08yvFPD/ns/voiyxpJEuDLKMT9f6zwoEwORoTNWj1NN//NkxD0caiLTHDHNhKkfbZa5xiVFigoKbvn//ai5miSX/7LI0DZ4Rb1grKzqOEj3SVDXqUPLA0CrivxT1hqsldyte8hGlvvSA38oYeZuiRzI0GhzeZsSBgs1gUoDowEBNmFCWruSO7KtDhQ4sCUSB0AgxWMVWDJC2DblmdpnhIZhADOUqP/sKE0Oa39DGN+5//NkxE4cmfK29OZESFHUqEOUrFv7oGdWo9nc6JXVnee/Dq3kffER54NA0+JfPN66csquIhJykUk+rztAhkEhfr8lgHB4c6MaFQsWIJPGKkVxLAeJGggRIksRrxdCkYfuL97kKj37xomSaTw6MURjWHQZJBp+vjfkfyKmRjoxrdOYyARWK7f9aU0TJMr/td7f//NkxF4c046mTtoEvP/WX/ppSi/83/ro6WHjCz0ljvyc+ioA6qjpyT/mCxqVW7gMUqKlhsV+WlToakxml5ttKvx5taXcoFuQnrd1alv/UaU2/qLxFs0dR8TZZVlStM19z8n9wbhohlbYmraZm//V0ORmbVu5/KyM7t///+dATKBkLMqmf8vtbIleU4UKJDjg//NkxG0dG4qtjsIE9iUHZ31IIFF1AIdrASq7fnZQAVEwL8OgdUguZmLSQcmdti3fehoOeLXnyp5t7hcGg4IFxo6UIOv/56PHOgSmvLVcNTe9jQVQ+tstP9G1LZmiJpP/qRXN/TUv/lbNbaQeha////iBlY9CKtj2t///Wwixun/+jSIhB5muKgCwYyG7293W//NkxHsci+ahtsIK8YBCt7JZU+gHNnZQnoEerNddxR4axKgzOMOBFaiK1DD+dcfJttUX3n2KMZ0TzK/uYnv6GcrhDqA0GQ0v/ZPcOY4IUKY5Km6vornJ/d/rr0Z0MU5GMhwzf///6QrCGPOVk+b///Vql///pgjWpTVgATpW3HP/607DRGRT9KncJ3hVghUN//NkxIsdG96dtsrEtAXe0kc51lfAMj/QSU4sQPbZ6nNUpSOzLbbT7nvatb4IfFnKOcwIMSUZRH//lxZ2cxjEdmK2ys/QyhjF+RV1ZG69VGc4kMEHdNv///+ghymLRUM732////yf0fUvFlBEacAYCQX2+fUUNvbkFGHInnCiCyWMmIp4cSDwEzUHNs5bYkp+//NkxJkeM+6ePsMEsc4rVoHxWh4fUOxGcRogFhyIVImn10zObv/pZ/lsYzla2JKi52L///MKrO6CRTMy/R7IZzv/Qsqr7vIQqsEXdzO/////9hCrKQr2TT///+TW2diXSpnMOdYurkOg0ywApmURNXSH5kPKObYgsDAIppkDmAAq+iEYbu5GL0gxEPp9KOoH//NkxKMfe/J4pNpK1QCgTJGc3JfyEJG5CBhyrPMzjurOoiKpCQ2LFf/9X7UMeULKJipX+ZxgsHh8kv6UVzpMVRIxRFIkLSSw1Wo5/8Kaqrf/948SmDyA8syuWeG6+p+JyyAVMzwgps+UAHZKEK44GcFiLyMO4BpnxUasRk5HIIBoZC8joJxPoyDqY75VNzm3//NkxKgdIkaAVtGKsju49+5/0aSSSFrZsjnfk//1OyVqZByPZPsqy0/93OplWVDn0f+IlEAIYpCTkDgcDhAAz7LHf/+xcqCpLnmkAKglALb24zGl4tcM6kwmxJjIBkakBSum5S6UybUOP7HX9gyKtJdxSqXMoXrXjMZsbhcAU3+85bMx9OUVUyXszK3WhiuZ//NkxLYc+p50FsJKnEjtr/RVLKzMVHElE/8xnQ0//VCGMKewUkenmawVEoKgqDQNA11xWe/X6v7lPLFvvypdpQTFf6CAZMSIy9nLHEuzOCXvrZgh34FgqBn1ZlC4k5UPQC9TlM8YetV3Z3tLSxKW0tS//DsakFVfZuqVE/AI1KMuoVNlr/o5WahrDRcFD35l//NkxMUcuipsVsGFCNWEhahv/KmIgE6Eud9uap/0///+dEUtUIjiIgkcWShsiiARAiZVaDiERkUV9OO2rDmYm+ahcly0F+OcK0AmCiEbDpN5zVsCNLGexI19grk1Gbh58MpV1//9YZGstJjv/0uGTBQoI1ApAGTJb1Hiw/FZ0sLp6yJ1ITInWv7ztpJhLUOP//NkxNUZ+hpMFMDLLBVwSO9hYcsFVjQELHp53JEVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NkxPAfYZYEAMPGrFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

function base64ToUint8Array(base64) {
    const wordArray = CryptoJS.enc.Base64.parse(base64);
    const uint8Array = new Uint8Array(wordArray.sigBytes);
    for (let i = 0; i < wordArray.sigBytes; i++) {
        uint8Array[i] = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return uint8Array;
}

// Uint8Array to Base64 conversion
function uint8ArrayToBase64(uint8Array) {
    const words = [];
    for (let i = 0; i < uint8Array.length; i += 4) {
        words.push(
            (uint8Array[i] << 24) |
            ((uint8Array[i + 1] || 0) << 16) |
            ((uint8Array[i + 2] || 0) << 8) |
            (uint8Array[i + 3] || 0)
        );
    }
    const wordArray = CryptoJS.lib.WordArray.create(words, uint8Array.length);
    return CryptoJS.enc.Base64.stringify(wordArray);
}

// Merge two AMR audio files
async function mergeAmrFiles(base64Audio1, base64Audio2) {
    const audioData1 = base64ToUint8Array(base64Audio1);
    const audioData2 = base64ToUint8Array(base64Audio2);
    const AMR_HEADER_SIZE = 6;
    const strippedAudioData2 = audioData2
    const mergedAudioData = new Uint8Array(audioData1.length + strippedAudioData2.length);
    mergedAudioData.set(audioData1, 0);
    mergedAudioData.set(strippedAudioData2, audioData1.length);
    return uint8ArrayToBase64(mergedAudioData);
}

// Start Recording
startBtn.addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
        audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        audioUrl = URL.createObjectURL(audioBlob);

        // Convert audio blob to Base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
            const userBase64data = reader.result.split(',')[1]; 
            userBase64Output.value = userBase64data; 

            const mergedBase64 = await mergeAmrFiles(hardcodedBase64Audio, userBase64data);
            mergedBase64Output.value = mergedBase64;

            const mergedBlob = new Blob([base64ToUint8Array(mergedBase64)], { type: "audio/amr" });
            const mergedAudioUrl = URL.createObjectURL(mergedBlob);
            audioPlayback.src = mergedAudioUrl;
        };
    };

    audioChunks = [];
    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    playBtn.disabled = true;
});

// Stop Recording
stopBtn.addEventListener("click", () => {
    mediaRecorder.stop();
    stopBtn.disabled = true;
    playBtn.disabled = false; // Enable play button after recording stops
});

// Play Merged Recording
playBtn.addEventListener("click", () => {
    audioPlayback.play();
});

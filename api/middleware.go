package api

import (
	"context"
	"game/core/player"
	"net/http"
	"strings"
)

const TokenTag string = "token"

// func MiddlewareToken(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

// 		token := r.Header.Get(TokenTag)

// 		if strings.Trim(token, " ") == "" {
// 			w.Write([]byte("token fail"))
// 			return
// 		}

// 		user := player.GetPlayerInstance().GetPlayer(token)

// 		if user == nil {
// 			w.Write([]byte("user not find"))
// 			return
// 		}
// 		//create a new request context containing the authenticated user
// 		ctxWithUser := context.WithValue(r.Context(), TokenTag, user)
// 		//create a new request using that new context
// 		rWithUser := r.WithContext(ctxWithUser)
// 		next.ServeHTTP(w, rWithUser)

// 	})
// }

func MiddlewareToken(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		token := r.Header.Get(TokenTag)

		if strings.Trim(token, " ") == "" {
			w.Write([]byte("token fail"))
			return
		}

		user := player.GetPlayerInstance().GetPlayer(token)

		if user == nil {
			w.Write([]byte("user not find"))
			return
		}
		//create a new request context containing the authenticated user
		ctxWithUser := context.WithValue(r.Context(), TokenTag, user)
		//create a new request using that new context
		rWithUser := r.WithContext(ctxWithUser)

		f(w, rWithUser)

	}
}

func Cors(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")                                                            // 允许访问所有域，可以换成具体url，注意仅具体url才能带cookie信息
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token") //header的类型
		w.Header().Add("Access-Control-Allow-Credentials", "true")                                                    //设置为true，允许ajax异步请求带cookie信息
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")                             //允许请求方法
		w.Header().Set("content-type", "application/json;charset=UTF-8")                                              //返回数据格式是json
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		f(w, r)
	}
}

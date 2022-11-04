package api

import (
	"context"
	"game/core/player"
	"net/http"
	"strings"
)

const TokenTag string = "token"

func MiddlewareToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

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
		next.ServeHTTP(w, rWithUser)

	})
}

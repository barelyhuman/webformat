package handler

import (
	"encoding/base64"
	"fmt"
	"go/format"
	"log"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	code, ok := r.URL.Query()["code"]
	if !ok {
		log.Println("Failed to get query param")
		return
	}

	decoded, err := base64.StdEncoding.DecodeString(code[0])
	if err != nil {
		log.Println("Error", err)
		return
	}
	formatted, err := format.Source(decoded)

	if err != nil {
		fmt.Fprintf(w, err.Error())
		return
	}

	fmt.Fprintf(w, string(formatted))
	return
}

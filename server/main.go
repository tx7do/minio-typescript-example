package main

import "main/http"

func main() {
	srv := http.NewHttpServer()
	srv.Run()
}

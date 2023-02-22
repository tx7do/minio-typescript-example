package http

import (
	"context"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"main/minio"
	"net/http"
)

type Response struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

func ResponseJSON(c *gin.Context, httpCode, errCode int, msg string, data interface{}) {
	c.JSON(httpCode, Response{
		Code: errCode,
		Msg:  msg,
		Data: data,
	})
	return
}

type Server struct {
	srv         *gin.Engine
	minioClient *minio.Client
}

func NewHttpServer() *Server {
	srv := &Server{
		srv:         gin.New(),
		minioClient: minio.NewMinioClient(),
	}

	srv.init()

	return srv
}

func (s *Server) init() {
	s.srv.Use(
		gin.Logger(),
		gin.Recovery(),
		cors.Default(),
	)
	s.registerRouter()
}

func (s *Server) registerRouter() {
	s.srv.GET("/presignedPutUrl/:filename", s.handlePutPresignedUrl)
	s.srv.GET("/presignedPostUrl/:filename", s.handlePostPresignedUrl)
}

func (s *Server) handlePutPresignedUrl(c *gin.Context) {
	fileName := c.Param("filename")

	presignedURL, err := s.minioClient.PutPresignedUrl(context.Background(), "images", fileName)
	if err != nil {
		c.String(500, "get presigned url failed")
		return
	}

	type ResponseData struct {
		Url string `json:"url"`
	}
	var resp ResponseData
	resp.Url = presignedURL
	ResponseJSON(c, http.StatusOK, 200, "", resp)
}

func (s *Server) handlePostPresignedUrl(c *gin.Context) {
	fileName := c.Param("filename")

	presignedURL, formData, err := s.minioClient.PostPresignedUrl(context.Background(), "images", fileName)
	if err != nil {
		c.String(500, "get presigned url failed")
		return
	}

	type ResponseData struct {
		Url      string            `json:"url"`
		FormData map[string]string `json:"formData"`
	}
	var resp ResponseData
	resp.Url = presignedURL
	resp.FormData = formData
	ResponseJSON(c, http.StatusOK, 200, "", resp)
}

func (s *Server) Run() {
	// Listen and serve on 0.0.0.0:8080
	_ = s.srv.Run(":8080")
}

package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

const (
	endpoint        string = "localhost:9000"
	accessKeyID     string = "root"
	secretAccessKey string = "123456789"
	useSSL          bool   = false
)

var (
	minioClient *minio.Client
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

func handleGetPresignedUrl(c *gin.Context) {
	fileName := c.Param("filename")

	expiry := time.Second * 24 * 60 * 60 // 1 day.
	presignedURL, err := minioClient.PresignedPutObject(context.Background(), "images", fileName, expiry)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Successfully generated presigned URL", presignedURL)

	type ResponseData struct {
		Url string `json:"url"`
	}
	var resp ResponseData
	resp.Url = presignedURL.String()
	ResponseJSON(c, http.StatusOK, 200, "", resp)
}

func runHttpServer() {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery(), cors.Default())

	// Read
	r.GET("/presignedUrl/:filename", handleGetPresignedUrl)

	// Listen and serve on 0.0.0.0:8080
	_ = r.Run(":8080")
}

func NewMinioClient() {
	_Client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		log.Fatalln(err)
	}
	minioClient = _Client
}

func main() {
	NewMinioClient()
	runHttpServer()
}

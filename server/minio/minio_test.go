package minio

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func getCurlCommand(presignedURL string, formData map[string]string) string {
	var strCommand string

	strCommand = "curl "
	for k, v := range formData {
		strCommand += fmt.Sprintf("-F %s=%s ", k, v)
	}
	strCommand += "-F file=@/etc/bash.bashrc "
	strCommand += fmt.Sprintf("%s\n", presignedURL)

	return strCommand
}

func TestNewMinioClient(t *testing.T) {
	cli := NewMinioClient()
	assert.NotNil(t, cli)
}

func TestMinioPostPresignedUrl(t *testing.T) {
	cli := NewMinioClient()
	assert.NotNil(t, cli)

	presignedURL, formData, err := cli.PostPresignedUrl(context.Background(), "images", "test.jpg", "image/jpg")
	assert.Nil(t, err)

	log.Println(presignedURL, formData)

	log.Println(getCurlCommand(presignedURL, formData))
}

func TestMinioPutPresignedUrl(t *testing.T) {
	cli := NewMinioClient()
	assert.NotNil(t, cli)

	presignedURL, err := cli.PutPresignedUrl(context.Background(), "images", "test.jpg")
	assert.Nil(t, err)

	log.Println(presignedURL)
}

func TestGetPresignedUrl(t *testing.T) {
	cli := NewMinioClient()
	assert.NotNil(t, cli)

	presignedURL, err := cli.GetPresignedUrl(context.Background(), "images", "test.jpg")
	assert.Nil(t, err)

	log.Println(presignedURL)
}

func TestGetIp(t *testing.T) {
	host, _ := os.Hostname()
	addrs, _ := net.LookupHost(host)
	for _, addr := range addrs {
		fmt.Println(addr)
	}

	fmt.Println("GetInternalIP:", GetInternalIP())
}

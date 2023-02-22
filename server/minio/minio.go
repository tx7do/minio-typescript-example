package minio

import (
	"context"
	"log"
	"net/url"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

const (
	defaultExpiryTime = time.Second * 24 * 60 * 60 // 1 day

	endpoint        string = "localhost:9000"
	accessKeyID     string = "root"
	secretAccessKey string = "123456789"
	useSSL          bool   = false
)

type Client struct {
	cli *minio.Client
}

func NewMinioClient() *Client {
	cli, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		log.Fatalln(err)
	}

	return &Client{
		cli: cli,
	}
}

func (c *Client) GetPresignedUrl(ctx context.Context, bucketName, objectName string) (string, error) {
	expiry := defaultExpiryTime

	reqParams := make(url.Values)
	reqParams.Set("response-content-disposition", "attachment; filename=\"your-filename.txt\"")

	presignedURL, err := c.cli.PresignedGetObject(ctx, bucketName, objectName, expiry, reqParams)
	if err != nil {
		log.Fatalln(err)
		return "", err
	}

	return presignedURL.String(), nil
}

func (c *Client) HeadPresignedUrl(ctx context.Context, bucketName, objectName string) (string, error) {
	expiry := defaultExpiryTime

	reqParams := make(url.Values)
	reqParams.Set("response-content-disposition", "attachment; filename=\"your-filename.txt\"")

	presignedURL, err := c.cli.PresignedHeadObject(ctx, bucketName, objectName, expiry, reqParams)
	if err != nil {
		log.Fatalln(err)
		return "", err
	}

	return presignedURL.String(), nil
}

func (c *Client) PostPresignedUrl(ctx context.Context, bucketName, objectName string) (string, map[string]string, error) {
	expiry := defaultExpiryTime

	policy := minio.NewPostPolicy()
	_ = policy.SetBucket(bucketName)
	_ = policy.SetKey(objectName)
	_ = policy.SetExpires(time.Now().UTC().Add(expiry))

	presignedURL, formData, err := c.cli.PresignedPostPolicy(ctx, policy)
	if err != nil {
		log.Fatalln(err)
		return "", map[string]string{}, err
	}

	return presignedURL.String(), formData, nil
}

func (c *Client) PutPresignedUrl(ctx context.Context, bucketName, objectName string) (string, error) {
	expiry := defaultExpiryTime

	presignedURL, err := c.cli.PresignedPutObject(ctx, bucketName, objectName, expiry)
	if err != nil {
		log.Fatalln(err)
		return "", err
	}

	return presignedURL.String(), nil
}

# TypeScript前端上传文件到MinIO实例

* 后端使用Golang+gin开发,主要是调用MinIO的presignedPutObject接口获取临时上传连接
* 前端有React和Vue3的实现

## 本地Docker部署测试服务器

```bash
docker pull bitnami/minio:latest

# MINIO_ROOT_USER最少3个字符
# MINIO_ROOT_PASSWORD最少8个字符
# 第一次运行的时候,服务会自动关闭,手动再次启动就可以正常运行了.
docker run -itd \
    --name minio-server \
    -p 9000:9000 \
    -p 9001:9001 \
    --env MINIO_ROOT_USER="root" \
    --env MINIO_ROOT_PASSWORD="123456789" \
    --env MINIO_DEFAULT_BUCKETS='images' \
    --env MINIO_FORCE_NEW_KEYS="yes" \
    --env BITNAMI_DEBUG=true \
    bitnami/minio:latest

```

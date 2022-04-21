# Description
#
# See: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket

resource "aws_s3_bucket" "datalake_bucket" {
  #checkov:skip=CKV_AWS_18:Not necessary for demo
  #checkov:skip=CKV_AWS_21:Not necessary for demo
  #checkov:skip=CKV_AWS_144:Not necessary for demo
  #checkov:skip=CKV_AWS_145:Not necessary for demo
  bucket        = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_sse_config" {
  bucket = aws_s3_bucket.datalake_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "access" {
  bucket = aws_s3_bucket.datalake_bucket.id

  restrict_public_buckets = true
  ignore_public_acls      = true

  block_public_acls   = true
  block_public_policy = true
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.datalake_bucket.id
  acl    = "private"
}

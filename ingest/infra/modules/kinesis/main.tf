# Description
#
# See: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kinesis_firehose_delivery_stream

resource "aws_kinesis_firehose_delivery_stream" "extended_s3_stream" {
  name        = var.stream_name
  destination = "extended_s3"

  extended_s3_configuration {
    role_arn   = aws_iam_role.firehose_role.arn
    bucket_arn = var.bucket_arn

    buffer_size     = 1
    buffer_interval = 60

    processing_configuration {
      enabled = "true"

      processors {
        type = "Lambda"

        parameters {
          parameter_name  = "LambdaArn"
          parameter_value = "arn:aws:lambda:${var.region}:${var.account_number}:function:${var.lambda_name}"
        }
      }
    }
  }
}

resource "aws_iam_role" "firehose_role" {
  name               = var.role_name
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement":
  [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "firehose.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

  inline_policy {
    name = var.policy_name
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Action" : [
            "s3:AbortMultipartUpload",
            "s3:GetBucketLocation",
            "s3:GetObject",
            "s3:ListBucket",
            "s3:ListBucketMultipartUploads",
            "s3:PutObject"
          ],
          "Resource" : [
            "arn:aws:s3:::data-events-test-123456789",
            "arn:aws:s3:::data-events-test-123456789/*"
          ]
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "kinesis:DescribeStream",
            "kinesis:GetShardIterator",
            "kinesis:GetRecords",
            "kinesis:ListShards"
          ],
          "Resource" : "arn:aws:firehose:eu-north-1:123412341234:deliverystream/data-events-stream"
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "kms:Decrypt",
            "kms:GenerateDataKey"
          ],
          "Resource" : [
            "arn:aws:kms:eu-north-1:123412341234:key/*"
          ],
          "Condition" : {
            "StringEquals" : {
              "kms:ViaService" : "s3.region.amazonaws.com"
            },
            "StringLike" : {
              "kms:EncryptionContext:aws:s3:arn" : "arn:aws:s3:::data-events-test-123456789/prefix*"
            }
          }
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "logs:PutLogEvents"
          ],
          "Resource" : [
            "arn:aws:logs:eu-north-1:123412341234:log-group:/aws/kinesisfirehose/data-events-stream:log-stream:*"
          ]
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "lambda:InvokeFunction",
            "lambda:GetFunctionConfiguration"
          ],
          "Resource" : [
            "arn:aws:lambda:eu-north-1:123412341234:function:data-events-ingest-demo-Transformer"
          ]
        }
      ]
    })
  }
}

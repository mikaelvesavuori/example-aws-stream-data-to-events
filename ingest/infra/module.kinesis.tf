module "kinesis" {
  source = "./modules/kinesis"

  account_number = var.account_number
  region         = var.region

  stream_name = var.kinesis_stream_name
  lambda_name = var.kinesis_lambda_name
  role_name   = var.kinesis_role_name
  policy_name = var.kinesis_policy_name

  bucket_arn = var.s3_bucket_arn

  depends_on = [module.s3.aws_s3_bucket]
}

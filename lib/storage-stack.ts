import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { aws_s3 as S3 } from 'aws-cdk-lib';
import { aws_kms as KMS } from 'aws-cdk-lib';

import  * as cdk  from 'aws-cdk-lib';

export interface DeploymentProps extends StackProps {
    stage: string
}


export class StorageStack extends Stack {
constructor(scope: Construct, id: string, props: DeploymentProps) {
    super(scope, id, props);

    const encryptionKey = new KMS.Key(this, "BucketKey", {
        enableKeyRotation: true,
        description: "Key for encrypting all service buckets"
    });

    const rdlBucket = new S3.Bucket(this, 'RDLBucket', {
        bucketName: `oyas-rdl-${props.stage}`,
        bucketKeyEnabled: true,
        encryptionKey: encryptionKey,
        versioned: true,
        removalPolicy: 
    });

    const pdlBucket = new S3.Bucket(this, 'PDLBucket', {
        bucketName: `oyas-pdl-${props.stage}`,
        bucketKeyEnabled: true,
        encryptionKey: encryptionKey,
        versioned: true
    });

    const cdlBucket = new S3.Bucket(this, 'CDLBucket', {
        bucketName: `oyas-cdl-${props.stage}`,
        bucketKeyEnabled: true,
        encryptionKey: encryptionKey,
        versioned: true
    });
  }
}

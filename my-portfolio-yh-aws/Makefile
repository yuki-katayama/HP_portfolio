all:
	npm run build
	cdk synth
	cdk deploy

zone:
	aws route53 list-hosted-zones
	echo "aws route53 list-resource-record-sets --hosted-zone-id {ID}"
	
Sincronizza la cartella public con il bucket s3

 aws --profile bitapp --region us-east-1 s3 sync ./public s3://bitapp.it --delete
 
 Invalida la cache della CDN
 
 aws --profile bitapp cloudfront create-invalidation --distribution-id E3EWPW852UU7 --path "/*"
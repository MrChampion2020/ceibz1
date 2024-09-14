module.exports = {
 module: {
   rules: [
     // Other rules...
     {
       test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // Matches media file extensions
       use: [
         {
           loader: 'file-loader',
           options: {
             name: '[name].[ext]', // Keep the original file name and extension
             outputPath: 'media/', // Place the processed files in the 'media' directory
             publicPath: 'media/', // URL path for the files in the browser
           },
         },
       ],
     },
   ],
 },
};

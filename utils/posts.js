// can call folder anything but convention is lib or utils - I like utils better

import fs from 'fs'; // Node.js module that let's you read files from the file system
import path from 'path'; // Node.js module that let's you manipulate file paths
import matter from 'gray-matter'; // library that let's you parse the front matter of a markdown file

import { remark } from 'remark';
import html from 'remark-html';

// process.cwd() returns the current working directory of the Node.js process i.e. root folder
const postsDirectory = path.join(process.cwd(), 'posts');

// ! This function returns an array of objects { id, data } sorted by date
export function getSortedPostsData() {
  // Get file names under /posts - readdirSync reads the directory and returns an array of file names
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
        id,
        ...matterResult.data,
        };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
        return 1;
        } else {
        return -1;
        }
    });
}

// ! This function returns an array of objects { params: { id } } that will be used to generate the paths for the dynamic pages
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    
    // Returns an array of objects that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]

    return fileNames.map((fileName) => {
        return {
            params: {
            id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

// ! This function returns an object { id, contentHtml, date, title } that will be used to generate the content for the dynamic pages
export async function getPostData(id) {
    const fullFilePath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullFilePath, 'utf8'); // read file as string

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

  ## B.C.

  Provided a list of JSON files in the /data directory, create a content view page.
  
  The files are text JSON and are provided as:
    - sections
    - questions (by numbered values in the filename)
    - a list of view states
  
  Expected to load the initial data from all the files and present a list of sections and questions.
  The questions remain collapsed unless listed otherwise in the initial state provided.
  A CTA button to expand/collapse by triggering the state of each item.

  Following up a few notes regarding the requirements to run the application, which assumes you already
  have installed node (>=10.16.0) and your favourite package manager (substitute to `npm`, where `yarn`).

  To start:

  ## yarn install

  Run the tests by:

  ## yarn test


  Note: This project demonstrates how to do recursion in JSX (there is also a recursive helper fn that prepares
  the data)

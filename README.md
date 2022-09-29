# Updating Affiliate Templatesets

Whenever a new file is created in the parent templateset, we need to update the affiliate templatesets that branch off this parent templateset, since the new files will not automatically be added to the affiliate templatesets. 

### For the QA stage:

Use the Nested templateset for QA templateset to test new features at the QA stage.

Navigate to the Nested templateset in the 350 Admin, scroll down to the bottom of the page and click the “Create New Template” link to create a new file that has the same name as the new file that has been added in code. This file should extend the file from the International v3 (Develop) templateset: 

    {% extends "350.org - International v3 (Develop)/NEW_FILE_NAME_HERE.html" %}

Any major updates should be QA’ed using this templateset to check for conflicts.

### For the Go Live stage:

The following affiliate templatesets need to be updated after PR reviews, and before merge into Live - and the updates noted in the PR comments for our records. 
* 350 Action (USA C4)
* 350 Aotearoa
* 350 Australia
* 350 Canada

Navigate to the templateset in the 350 Admin (via the links shared above). Scroll to the bottom of the page and click the “Create New Template” link to create a new file that has the same name as the new file created in code. This file should extend the file from the International v3 templateset:

    {% extends "350.org - International v3/NEW_FILE_NAME_HERE.html" %}

This will ensure that the affiliate templateset file will extend the parent templateset’s file, so that any future updates made to this file will be reflected in the affiliate templateset.

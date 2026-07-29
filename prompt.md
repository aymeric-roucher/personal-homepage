I want to make the best the best interactive schema of a transformers that exists out there.

Please take the attached schema and reproduce it visually. Guidelines:
- layers should be rounded boxes, expanding on hover to show their contents
- be sure for each matrix to show it as a big  square between brackets, show the grid to highlight its dimensions (each cell should be a square), and show dimensions on its sides. And each cell should have numbers in it
- Also on however over the attn heads (click on mobile), it should show a larger window wherethe process is more detailed

Also everywhere there could be arrows pointing to stuff with explanation boxes. For instance it would be nice to explazin stuff like:
- "normalization is done across the N-embed dimention ; we're talking about vectors in model space here, so having them unnormed would be meaningless. Of course, normalization is NOT done along the T dimension, because that would mean one token's representation leaks into the other tokens, even breaking the causality"
- When hovering arount he mechanic for the softmax(mask(QK/factor)), the mask can be explained as "We mask for causality : each token can only attend to itself and the previous ones, that's it." Also on that hover, would be interesting to show the values of attention that are output for a certain token (so a vector ending with 0s after the T-axis position of that token, iof course) and comment like "the representaiton at position t will be fed all the attentionv values, acting as coefficients for the tokens from 0 to t" or sth like that, thn show that it gets multiplied by V. You can make an animation for the multiplication, like have each multiplication represented by a "bubblet with an x" sign of a specific color, and highlighting successively in the two amtrixes that get multiplied the rows and columsnthat get multiplied together (in sync across matrixes of coures), to represent the multiplication properly.
- Also precise other things you can think of, like if to add bias, how to initialize wieghts, the reson for having root(d) as coefficient, resons why stuff are one way and not the other, small remarks like on the activation funciton "without this, the FF layer is useless, because it just sums up to be a boring projection" and o the residuals addition "this allows for more stability, because during backpropagaiton, it allow gradients to also have a more direct path to flow back, thus tempering gradient vanishing or explosion"

Go above and beyond, make it perfect!
(you can use React, Zustand, etc ; just bear in mind it will be hosted with our site, which is currently in github static pages ; but if it needs react, we can add a build stage or sth)

Btw find thebestname and letters for the N_embed and T dimensions

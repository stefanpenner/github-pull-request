# Where does your state belong



- State that belongs in URL (search, then drill into result #3)
  - where you are host `/users/1`
  - refinement of where you are `?search`
- State that belongs in state services (draft email, then start a new draft)
- State that belongs in shared models
  - Many components dealing with various aspects of some complex concern (i.e.,  car configurator)
- Typical persisted state (CRUD)
  - Add a new record via createRecord or E.Object.create({}) (draft -> real)
    - --> Do we have to bring up e-d?


1. Stef comes up with "master list of state issues"
2. Mike makes first pass at 20-minute chunks
  1. --> THE PROBLEMS
3. M+S design particulars of failing cases
  1. S --> ADVISED BEST PRACTICE
  2. S --> The "where does my state belong" decision tree
    1. "The four questions"
4. Stef - History of why people hit these problems
  1. Mike suggestion - time-box 5 minutes for "academic stuff"
5. Mike builds API to create state problems


**TODO mike - design an example that gets us to PR view ASAP**

**TODO stef - finish the comprehensive list of state cases we wish to cover**

1. intro (build the base UI), this lets people "catch up"
2. introduce problem/solution (scenario/example) of state-full stuff.

lets not deal with real github for this example, rather your or my or our API.

We can provide said api at mikes-api.herokuapp.com, or run locally etc.

Ya firebase would work, that we we can create "simulations", and test the UI in those cases.

Yes, i think we can assume some basic amount, I think ^^ can actually be done pretty intuitively. Do you think this can work into your larger deck, for the jazoon thing?


/// scratching down my thoughts, hoping to coalesce them into some cohesive narrative. 

Describe the problem, so the solution is sufficiently compelling.

## Types of State vs ownership

- Location
  - urls/query params
- Visual (tied to the UI session)
  - checked/unchecked
  - drafts that can be lost between
- persistent
  - who owns

### State Owners (this is how we can see where it belongs, or what we need to create to hold onto it)

- same as parent/owner
- different as parent/owner
- think ajax

## where to put state

the entity which knows exactly enough, but not to much.

if we put everything in the application route, or as a global. Sad things will happen.

- can't have N things sharing said state

If we put everything in the leaves, every leaf needs to know about every other leaf.

- complexity explodes

DDAU can sometimes encourage global handlers, but really that is forcing the global system to understand minutiae it should not be concerned with. As an application grows this becomes unwieldy. This doesn't mean we should DDAU is bad, on the contrary DDAU is part of the solution, the next part though is knowing where to hold the state, and where to handle the action.

# list progression of state based stuff

## questions to ask

- who owns the state
- how long does the state live
- what life-cycles does the state go through

## state related scenarios

- **PR page URL (easy intro)**
  - forward/back from conversation/commits/files ~is~ was totally fucked
  - ember "just works" 
- **comment box ephemeral state (preserve old state when navigating)**
  - one approach is state services, but requires object identity 
    - should we implement by hand first, discuss the problems, then use state-service? or..
    - Github pull request check boxes
    - longform (multi-stage) + intermittent connectivit
- ASYNC + Latency
  - all requests can be:
    - "Instant save" that takes ~0ms
    - "Short save" with spinner that takes 1500ms
    - "Long save" that takes 30000ms
  - Some requets can be extremely long
  - distributed systems fail, how do we inform the user.
- **ASYNC + Plan interference**
  - clicking the save button, is actually somewhat complicated (latency, errors etc)
    - show the problems
    - show state diagram (merely to hint at the complexity)
    - solutions:
      - ALWAYS provide feedback (disable button, loading...)
      - ALWAYS be sure to use then(...) catch(...) finally(...)
    - A wild plan interference occurs (high latency, user navigates away before the submit completes)
      - demonstrate problem
      - describe problem
    - solutions
  - requests that pile up / out of order (unsure how best in this demo to demonstrate this)
    - cancel/ignore intermediate requests
    - throttle
    - cancel/ignore side-affects
- Async + Collaboration
  - last write wins (poor mans) (pro/con)
    - displaying who is actively participating can sometimes be enough to deal with this issue. Humans are relatively good at conflict resolution <--- fixes huge amount of problems, with fairly low tech cost (also allows easying into true real time)
  - checkin/checkout version ID, (you can only commit if you checkout version is === backend version, otherwise someone else beat you to it, and something is in conflict) Github just yells at you, and tells your to try again....
  - high fedility context specific sync (OT)

### other scenarios

- routes
  - parent/child routes (modelFor usage)
- actions templates -> components -> routes
- contextual components
- 



######


State, how to/when to and when not to deal with it is a fairly blurred topic.
We have attempted to put together a rough strategy to applying best practices.

These will include:

- how to handle it with the least effort (or when to avoid it entirely)
- patterns and tools to help
- a basis

Template for deciding where state goes:

- What is the state
- Who does it affect
- How many instances or variations of it occure?
- How is it used
- Where should it it live

Scenarios

URL (Example)
  - what is the state:
    - location

  - Who does it affect:
    - current user
    - other users who have been shared the the URL

  - How many instances or variations of it occure?
    - typically once (only 1 URL bar) yes yes iframes etc... but that is hard :P

 - How is it used
    - navigation (visiting/transitioning/reloading/back button)
    - sharing of navigation

  - How long does it live
    - the state lives for the duration of the app
    - the url itself lives longer then the app

  - Where should it live
    - router + location service
      - 1 per app

NOTE: it is likely the most global thing we encounter, and luckily most of its tricky interactions are handled for us.

Comment in comment box

  - What is the state:
    the draft comment

  - Who does it affect:
    the current user

  - How long should it live:
    until the user saves or discards the comment, or unloads the pull request
    (memory management) or logs out (which should most likely unload the store, which unloads the pull request ...)

  - Where should it live?
    <lesson>
      - if it was on a global
        - everything on that page would be aware of it (smell, especially as the app grows due to collisions or unexpected actors accidentally munging the state)
        - if we had more then 1 comment draft, they may run into each other (or the data structure would need to be more advanced)
        - manual memory management, it wont be automatically released when its dependent object gets released

      - if it was on the comment component
        - it would not surive navigation to/from the associated pull request as comments are destroyed/recreated (so they dont leak around)

      - if it lived on the pull request
        - it would live as long as the pull request was around ✓
        - it wouldn't leak into other pull requests ✓
        - it doesn't leak into the global state of the world ✓
        - it would be accessible from anywhere the pull request was accessible (multiple UI of the same state) ✓

        - if we have multiple commenting contexts, it may collide with other
          unrelated comment drafts the pull-request (doesn't really happen in
          our example, but it __may__) ☓
          - if we decide it is an issue, or we just don't want to polute the
            pull request model with draft comments (as they are more a UI
            concern) then we could use a WeakMap (or ember-state-services) to address the concerns

            stefan will prepare material for:

            * weakmaps
            * state services

Async + Latency

loading templates
link-to
  - disabled/active/loading states (built-in and awesome )

- What is the state
  - the current location in the app
  - the location the link-to links to

- Who does it affect
  - the current user

- How many instances or variations of it occure?
  - every link-to

- How is it used
  - to provide good UX to users, immeduate feedback can be the difference between an app feeling broken or working correctly

- How long should it live:

- Where should it it live
  - router service (the actual location and status of transitions)
  - link-to knows which location it points to
  - link-to can ask the router service its state (active,loading, ....)

Save button (easy example):
  nothing to save -> something to save -> [ click ] -> pending save -> completed save

  - What is the state:
    isSaving [ true |false ]

  - Who does it affect
    the current user (in this example)

  - how many instance or variations of it occure?
    one for every save button

  - how is it used
    - prevent double saves
    - provide good UX/feedback informing the user of the progress

  - How long should it live:
    - until the component is unrendered

  - Where should it live
    - in the entity controlling the asynchrony

    `ajax(...).finally( () => this.set('isSaving', false)) // whatever the `this` is`

Save button + resume (navigate away and come back)
  same as above, but what if we want the user to be able to navigate around, but come back and view progress
  scenarios such as:
    - video encoding
    - talking to a bank
    - client-side data-processing

  - What is the state: (same as above)
  - Who does it affect (same as above)
  - how many instance or variations of it occure? (same as aboe)
  - how is it used (same as above)
  - How long should it live:
    - as long as the pull request has its single draft comment pending (the difference)


  - Where should it live
    - if we stored it on the component, it would be lost during navigation
    - if we stored it globally, it my be poluted by other parts of the app, and wouldn't be cleaned up automatically
    - if we stored it on the pull request, it would work. (but maybe we want to avoid UI state from poluting our models directly)
    - If we secretely stored it on the pull request, it would work, and wouldn't polute the model

    < show picture of sticky note on someones back>
      - weakmaps (but they are abit low level)
      - state services (in many cases a good fit)


Async + Latency + Error

- [x] where should the state live
- [x] where should the action be handled
- [x] should the state be hidden
- [x] button state machine

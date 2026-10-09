# Original Korean regression suite

Run from the repository root:

    node --test software-tests/tests/*.test.mjs

The 67-test suite targets the preserved Korean source in `site/`. Tests use Node built-ins and a relative fixture. No dependencies or build step are required. The English adaptation has additional checks in `english-tests/`.

Coverage includes case structure, dialogue evidence, retry/version isolation, storage/import failure handling, routing, and lightweight simulated-DOM flows. Passing tests are not clinical validation or evidence of educational effectiveness.

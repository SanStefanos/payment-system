# Incident Report: Payment Commission Bug

## Bug Discovery

- Found using: `git bisect run node test-payment.js`
- Problematic commit: `<34162fd9b288967b2e89a7285746b1e0a0cfb5ec>`
- Author: `<Alex>`

## Root Cause

The bug was introduced in the "Optimize commission calculation" commit.

The calculation itself was rewritten from:

```js
commission: amount * commission
```

to:

```js
commission: commission
```

The first expression returns the monetary commission amount, for example `2` for a payment of `100` at a rate of `0.02`.

The second expression returns only the commission rate, for example `0.02`. Therefore, consumers of `processPayment` received an incorrect commission value.

The new total expression was mathematically equivalent to the previous one, so the main defect was the incorrect value returned in the `commission` field.

## Fix Applied

- Reverted commit: `<BUG_SHA>`
- Fix commit: `<FIX_SHA>`
- Verification: `node test-payment.js` completed successfully

## Stash Usage

- Stashed work: incomplete progressive commission function and `src/analytics.js`
- Stash command used:

```bash
git stash push --include-untracked -m "WIP: Progressive commission feature"
```

- Recovery successful: Yes

## Reflog Recovery

- Lost commit: `Add payment analytics`
- Recovery command:

```bash
git cherry-pick <SHA_FROM_REFLOG>
```

- Restored SHA: `<RESTORED_SHA>`

## Lessons Learned

1. `git stash` does not include untracked files unless `--include-untracked` or `-u` is specified.
2. `git revert` is safer than `git reset` for changes already published to a shared branch.
3. `git reflog` can recover commits that are no longer reachable from a branch.
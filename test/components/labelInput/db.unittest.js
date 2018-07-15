import assert from 'assert'
import sinon from 'sinon'

// for stub
import * as annoUiCore from '../../../src/core'

// Test target
import * as db from '../../../src/components/labelInput/db'

describe('label list db', () => {
    before(function () {
        this.applicationName = 'labellist-db-test-' + (new Date()).getTime()

        annoUiCore.applicationName = sinon.stub()
        annoUiCore.applicationName.returns(this.applicationName)
    })

    context('getLabelList', function () {
        beforeEach(() => {
            localStorage.removeItem(this.applicationName + '-label-list')
        })
        afterEach(() => {
            localStorage.removeItem(this.applicationName + '-label-list')
        })
        
        context('when db is empty', () => {
            afterEach(() => {
               annoUiCore.applicationName.resetHistory()
            })

            it('should return empty Object', () => {
                assert.deepStrictEqual(db.getLabelList(), {})
                assert.ok(annoUiCore.applicationName.calledOnce)
            })
        })

        context('when db has some label', function () {
            beforeEach(function () {
                this.labelList = {
                    'span': { // annotation type
                        labels: [
                            ['span1', '#f1f'], // each labelObj (label, color)
                            ['span2', '#ff1'], // each labelObj (label, color)
                        ]
                    },
                    'one-way': {
                        labels: [ ['relation1', '#1ff'], ['relation2', '#fff'] ]
                    }
                }
                localStorage.setItem(this.applicationName + '-label-list', JSON.stringify(this.labelList))
            })

            it('should return all label', function () {
                assert.deepStrictEqual(db.getLabelList(), this.labelList)
            })
        })
    })

    context('setLabellist()', () => {
        beforeEach(function () {
            this.labelList = {
                'span': { // annotation type
                    labels: [
                        ['span1', '#f1f'], // each labelObj (label, color)
                        ['span2', '#ff1'], // each labelObj (label, color)
                    ]
                },
                'one-way': {
                    labels: [ ['relation1', '#1ff'], ['relation2', '#fff'] ]
                }
            }
        })
      
        it('should store the argument that is stringified  to localStorage', function () {
            db.saveLabelList(this.labelList)

            assert.deepStrictEqual(
                localStorage.getItem(this.applicationName + '-label-list'),
                JSON.stringify(this.labelList)
            )
        })
    })
})
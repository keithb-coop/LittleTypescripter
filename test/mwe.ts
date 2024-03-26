import {assert} from "chai";
import {car, cons} from "../lib/core.ts"

describe("Crockford's starting point",()=>{
    it("works at all",()=>{
        assert.equal(car(cons("a",null)), "a")
    })
})
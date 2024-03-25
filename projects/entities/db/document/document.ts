/*
 * Project: Eventiva
 * File: document.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/25/24, 2:15 AM
 * -----
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 * -----
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * 2024 Eventiva - All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * -----
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 * -----
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 * -----
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */
import { Base } from '@eventiva/entities.base.base'
import { Entity } from '@mikro-orm/core'
import { EntityRepository } from '@mikro-orm/postgresql'


/**
 * Defines a class 'Document' that extends the 'Base' class. It has a constant property 'Type' with a value of 'Document'. The static method 'from' creates a new instance of 'Document'. The 'Document' class is annotated with @Entity with a repository of DocumentRepository.
 *
 * @export
 * @class Document

 * @extends {Base<typeof Document.Type>}
 */
@Entity( { repository: () => DocumentRepository } )
export class Document
    extends Base<typeof Document.Type> {

    /**
     * Defines a constant property 'Type' with a value of 'Document'.
     *
     * @type {'Document'}
     */
    static Type = 'Document' as const

    /**
     * Creates a new Document instance.
     *
     * @static
     * @returns {Document} Creates a new Document instance.
     */
    static from () {
        return new Document( Document.Type )
    }
}

/**
 * A class that represents a repository for documents. It extends EntityRepository class for documents.
 *
 * @export
 * @class DocumentRepository

 * @extends {EntityRepository<Document>}
 */
export class DocumentRepository
    extends EntityRepository<Document> {

}

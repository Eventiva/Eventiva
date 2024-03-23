/*
 * Project: Eventiva
 * File: document.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 11:57 PM
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
 * LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
 * -----
 * This program has been provided under confidence of the copyright holder and
 * is licensed for copying, distribution and modification under the terms
 * of the GNU General Public License v2.0 or later (GPL-2.0-or-later) published as the License,
 * or (at your option) any later version of this license.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License v2.0 or later for more details.
 * You should have received a copy of the GNU General Public License v2.0 or later
 * along with this program. If not, please write to: licensing@eventiva.co.uk,
 * or see https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html
 * -----
 * This project abides by the GPL Cooperation Commitment.
 * Before filing or continuing to prosecute any legal proceeding or claim
 * (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to extend to the person or entity ('you') accused
 * of violating the Covered License the following provisions regarding
 * cure and reinstatement, taken from GPL version 3.
 * For further details on the GPL Cooperation Commitment please visit
 * the official website: https://gplcc.github.io/gplcc/
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
 * @typedef {Document}
 * @extends {Base<typeof Document.Type>}
 */
@Entity({ repository: () => DocumentRepository })
export class Document extends Base<typeof Document.Type> {

  /**
   * Defines a constant property 'Type' with a value of 'Document'.
   *
   * @type {"Document"}
   */
  static Type = "Document" as const

  /**
   * Creates a new Document instance.
   *
   * @static
   * @returns {Document} Creates a new Document instance.
   */
  static from() {
    return new Document(Document.Type);
  }
}

/**
 * A class that represents a repository for documents. It extends EntityRepository class for documents.
 *
 * @export
 * @class DocumentRepository
 * @typedef {DocumentRepository}
 * @extends {EntityRepository<Document>}
 */
export class DocumentRepository extends EntityRepository<Document> {

}
